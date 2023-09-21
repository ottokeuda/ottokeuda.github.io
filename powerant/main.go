package main

import (
        "encoding/json"
        "fmt"
        "github.com/gin-gonic/gin"
        "golang.org/x/time/rate"
        "io/ioutil"
        "math"
        "net/http"
        "os"
        "sync"
        "time"
)

const DirectoryPath = "/home/otto/powerant/prices"
const monthlyLimit = 300

type MonthlyRateLimiter struct {
        LastRequestTime time.Time
        Count           int
        Limiter         *rate.Limiter
}

type SaveDataRequest struct {
        Country     string  `form:"country" binding:"required,max=15"`
        Timestamp   string  `form:"timestamp" binding:"required,max=15"`
        HoursActive float64 `form:"hoursactive" binding:"required"`
        KwhTrigger  float64 `form:"kwhtrigger"`
}
    
type APIKeyData struct {
        Country     string  `json:"country"`
        Timestamp   string  `json:"timestamp"`
        HoursActive float64 `json:"hoursactive"`
        KwhTrigger  float64 `json:"kwhtrigger"`
}

var APIKeys = map[string]*APIKeyData{
        "wdft-45gD-927D-2sfX3": {},
        "w43t-41GD-94yD-2sfdd": {},
        "w8ft-458D-24qD-2sAXs": {},
        "w8ft-458D-24qD": {},
        "t3H9-p7lR-c0vV": {},
        "mZ6y-h1eT-9s4Z": {},
        "B2oQ-x3pM-7iR5": {},
        "aD0l-k8Ht-w3zP": {},
        "E6sV-j1mD-2f8B": {},
        "c5Wz-r4Ql-y0pG": {},
        "u7Jh-f9bN-l6Xe": {},
        "G4oI-n2sR-v5Tz": {},
        "p0Ly-d3tM-h8Kj": {},
        // ... Add other API keys similarly
}

var apiKeyRateLimiters = make(map[string]*MonthlyRateLimiter)
var rateLimitersMutex = &sync.Mutex{}

func getRateLimiter(apiKey string) *rate.Limiter {
        rateLimitersMutex.Lock()
        defer rateLimitersMutex.Unlock()

        limiterInfo, exists := apiKeyRateLimiters[apiKey]
        if !exists {
                limiterInfo = &MonthlyRateLimiter{
                        LastRequestTime: time.Now(),
                        Count:           0,
                        Limiter:         rate.NewLimiter(rate.Limit(math.MaxFloat64), 1), // Infinite rate limiter initially
                }
                apiKeyRateLimiters[apiKey] = limiterInfo
        }

        if !isSameMonth(limiterInfo.LastRequestTime, time.Now()) {
                limiterInfo.Count = 0
                limiterInfo.Limiter = rate.NewLimiter(rate.Limit(math.MaxFloat64), 1) // Reset rate limiter for the new month
        }

        if limiterInfo.Count >= monthlyLimit {
                limiterInfo.Limiter = rate.NewLimiter(0, 1)
        } else {
                limiterInfo.Count++
        }

        limiterInfo.LastRequestTime = time.Now()
        return limiterInfo.Limiter
}

func isSameMonth(t1, t2 time.Time) bool {
        y1, m1, _ := t1.Date()
        y2, m2, _ := t2.Date()
        return y1 == y2 && m1 == m2
}

func saveData(c *gin.Context) {
        var req SaveDataRequest
        if err := c.ShouldBind(&req); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
    
        apiKey := c.Query("api_key")
    
        APIKeys[apiKey].Country = req.Country
        APIKeys[apiKey].Timestamp = req.Timestamp
        APIKeys[apiKey].HoursActive = req.HoursActive
        APIKeys[apiKey].KwhTrigger = req.KwhTrigger
    
        c.JSON(http.StatusOK, gin.H{"status": "data saved successfully"})
    }
    
    func retrieveData(c *gin.Context) {
        apiKey := c.Query("api_key")
        data := APIKeys[apiKey]
        c.JSON(http.StatusOK, data)
    }

func retrieveFile(c *gin.Context) {
        fileName := c.Query("file_name")

        filePath := fmt.Sprintf("%s/%s", DirectoryPath, fileName)
        if _, err := os.Stat(filePath); os.IsNotExist(err) {
                c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
                return
        }

        fileData, err := ioutil.ReadFile(filePath)
        if err != nil {
                c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file"})
                return
        }

        var jsonData interface{}
        if err := json.Unmarshal(fileData, &jsonData); err != nil {
                c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse file content"})
                return
        }

        c.JSON(http.StatusOK, jsonData)
}

func main() {
        gin.SetMode(gin.ReleaseMode)
        router := gin.Default()

        router.Use(func(c *gin.Context) {
                apiKey := c.Query("api_key")
                if apiKey == "" {
                        c.JSON(http.StatusBadRequest, gin.H{"error": "API key is required"})
                        c.Abort()
                        return
                }

                if _, exists := APIKeys[apiKey]; !exists {
                        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid API key"})
                        c.Abort()
                        return
                }

                limiter := getRateLimiter(apiKey)
                if !limiter.Allow() {
                        c.JSON(http.StatusTooManyRequests, gin.H{"error": "Monthly API limit exceeded for your key"})
                        c.Abort()
                        return
                }
                c.Next()
        })

        router.GET("/retrieve_data", retrieveData)
        router.POST("/save_data", saveData)
        router.GET("/retrieve_file", retrieveFile)

        err := router.Run(":8080")
        if err != nil {
                fmt.Println("Failed to start server:", err)
        }
}
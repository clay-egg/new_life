"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Plus, ChevronDown, ChevronUp } from "lucide-react"

interface ItineraryDay {
  day: number
  date: string
  activities: Activity[]
}

interface Activity {
  id: string
  time: string
  title: string
  location: string
  description: string
  duration: string
  type: "attraction" | "food" | "transport" | "accommodation"
}

export function ItineraryView({ tripId }: { tripId: string }) {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    {
      day: 1,
      date: "June 15, 2025",
      activities: [
        {
          id: "1",
          time: "09:00 AM",
          title: "Arrive at Narita Airport",
          location: "Narita International Airport",
          description: "Land in Tokyo and clear customs",
          duration: "2 hours",
          type: "transport",
        },
        {
          id: "2",
          time: "12:00 PM",
          title: "Check-in at Hotel",
          location: "Shibuya District",
          description: "Check into your hotel and freshen up",
          duration: "1 hour",
          type: "accommodation",
        },
        {
          id: "3",
          time: "02:00 PM",
          title: "Explore Shibuya Crossing",
          location: "Shibuya",
          description: "Visit the famous scramble crossing and explore the area",
          duration: "2 hours",
          type: "attraction",
        },
        {
          id: "4",
          time: "06:00 PM",
          title: "Dinner at Izakaya",
          location: "Shibuya",
          description: "Experience authentic Japanese pub food",
          duration: "2 hours",
          type: "food",
        },
      ],
    },
  ])

  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]))

  const toggleDay = (day: number) => {
    const newExpanded = new Set(expandedDays)
    if (newExpanded.has(day)) {
      newExpanded.delete(day)
    } else {
      newExpanded.add(day)
    }
    setExpandedDays(newExpanded)
  }

  const getActivityIcon = (type: Activity["type"]) => {
    const iconClass = "w-4 h-4"
    switch (type) {
      case "attraction":
        return <MapPin className={iconClass} />
      case "food":
        return <span className={iconClass}>🍽️</span>
      case "transport":
        return <span className={iconClass}>✈️</span>
      case "accommodation":
        return <span className={iconClass}>🏨</span>
    }
  }

  if (itinerary.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No itinerary yet</h3>
          <p className="text-muted-foreground mb-6">
            Generate an AI-powered itinerary or create your own day-by-day plan
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Itinerary</h2>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Activity
        </Button>
      </div>

      {itinerary.map((day) => (
        <Card key={day.day} className="overflow-hidden">
          <button
            onClick={() => toggleDay(day.day)}
            className="w-full p-6 flex items-center justify-between hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{day.day}</span>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">Day {day.day}</h3>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
            </div>
            {expandedDays.has(day.day) ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {expandedDays.has(day.day) && (
            <div className="px-6 pb-6 space-y-4">
              {day.activities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      {getActivityIcon(activity.type)}
                    </div>
                    {index < day.activities.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">{activity.time}</span>
                          <span className="text-sm text-muted-foreground">• {activity.duration}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">{activity.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

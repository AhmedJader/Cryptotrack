// comp/UserHandle.tsx
"use client"
import React, { useState, useEffect } from 'react'

const UserHandle = () => {
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('/api/user'); // API endpoint to fetch user name
        const data = await response.json();
        setUserName(data.name || 'Guest')
      } catch (error) {
        console.error('Failed to fetch user data', error)
      }
    }
    fetchUserName()
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold">Welcome, {userName}!</h2>
    </div>
  )
}

export default UserHandle

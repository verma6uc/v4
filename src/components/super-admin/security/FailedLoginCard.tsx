import React from 'react'
import { BaseCard } from '../../base/BaseCard'
import { AlertTriangle, Monitor } from 'lucide-react'

interface FailedLoginAttempt {
  id: string
  userId: string
  userEmail: string
  attemptAt: string
  ipAddress: string
  userAgent: string
  failedReason: string
}

interface FailedLoginCardProps {
  attempts: FailedLoginAttempt[]
  title?: string
  maxAttempts?: number
}

export function FailedLoginCard({
  attempts,
  title = 'Failed Login Attempts',
  maxAttempts = 5
}: FailedLoginCardProps) {
  // Group attempts by user
  const attemptsByUser = attempts.reduce((acc, attempt) => {
    if (!acc[attempt.userEmail]) {
      acc[attempt.userEmail] = []
    }
    acc[attempt.userEmail].push(attempt)
    return acc
  }, {} as Record<string, FailedLoginAttempt[]>)

  // Sort users by most recent attempt
  const sortedUsers = Object.entries(attemptsByUser)
    .sort(([, a], [, b]) => {
      const latestA = new Date(a[a.length - 1].attemptAt).getTime()
      const latestB = new Date(b[b.length - 1].attemptAt).getTime()
      return latestB - latestA
    })

  return (
    <BaseCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {attempts.length} failed attempts in the last 24 hours
          </p>
        </div>
      </div>

      <div className="divide-y">
        {sortedUsers.map(([email, userAttempts]) => {
          const isHighRisk = userAttempts.length >= maxAttempts
          const latestAttempt = userAttempts[userAttempts.length - 1]

          return (
            <div key={email} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 p-1 rounded ${
                  isHighRisk ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  {isHighRisk ? (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  ) : (
                    <Monitor className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {email}
                    </span>
                    {isHighRisk && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        High Risk
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {userAttempts.length} failed attempts
                  </p>

                  <div className="mt-2 space-y-2">
                    {userAttempts.slice(-3).reverse().map(attempt => (
                      <div key={attempt.id} className="text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <span>{new Date(attempt.attemptAt).toLocaleString()}</span>
                          <span>•</span>
                          <span>{attempt.ipAddress}</span>
                        </div>
                        <div className="mt-0.5 text-red-600">
                          {attempt.failedReason}
                        </div>
                      </div>
                    ))}
                    {userAttempts.length > 3 && (
                      <div className="text-xs text-gray-400">
                        + {userAttempts.length - 3} more attempts
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </BaseCard>
  )
}
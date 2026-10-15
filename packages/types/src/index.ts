export type RiskLevel = 'Normal' | 'Suspicious' | 'Critical'
export type UserRole = 'guard' | 'officer' | 'cso'

export interface Alert {
  id: string
  riskLevel: RiskLevel
  location: string
  behaviourClass: string
  anomalyScore: number
  createdAt: string
  acknowledgedAt: string | null
}

export interface CameraEvent {
  id: string
  cameraId: string
  timestamp: string
  personCount: number
  anomalyScore: number
  riskLevel: RiskLevel
}
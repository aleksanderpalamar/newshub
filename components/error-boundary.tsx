"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error("Error caught by ErrorBoundary:", event.error)
            setError(event.error)
        }

        window.addEventListener("error", handleError)

        // Also listen for unhandled promise rejections
        const handleRejection = (event: PromiseRejectionEvent) => {
            console.error("Unhandled promise rejection caught by ErrorBoundary:", event.reason)
            setError(new Error(event.reason?.message || "Unhandled promise rejection"))
        }

        window.addEventListener("unhandledrejection", handleRejection)

        return () => {
            window.removeEventListener("error", handleError)
            window.removeEventListener("unhandledrejection", handleRejection)
        }
    }, [])

    if (error) {
        return (
            <Alert variant="destructive" className="my-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro ao carregar notícias</AlertTitle>
                <AlertDescription>
                    <p className="mb-4">Não foi possível carregar as notícias. Erro: {error.message || "Erro desconhecido"}</p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setError(null)
                            window.location.reload()
                        }}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Tentar novamente
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    return children
}


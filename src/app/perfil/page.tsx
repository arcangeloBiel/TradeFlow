'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Lock, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function PerfilPage() {
    const { user, updatePassword } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'As senhas não coincidem.' })
            return
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres.' })
            return
        }

        setIsLoading(true)
        setMessage(null)

        const result = await updatePassword(password)

        if (result.success) {
            setMessage({ type: 'success', text: 'Senha atualizada com sucesso!' })
            setPassword('')
            setConfirmPassword('')
        } else {
            setMessage({ type: 'error', text: result.error || 'Erro ao atualizar senha.' })
        }

        setIsLoading(false)
    }

    if (!user) return null

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Meu Perfil</h1>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Informações do Usuário */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary-500" />
                            Informações Pessoais
                        </CardTitle>
                        <CardDescription>
                            Seus dados básicos cadastrados no sistema.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-1">
                            <Label className="text-gray-500 text-xs uppercase">Nome Completo</Label>
                            <p className="text-lg font-medium">{user.nome}</p>
                        </div>
                        <div className="grid gap-1">
                            <Label className="text-gray-500 text-xs uppercase">Email Corporativo</Label>
                            <p className="text-lg font-medium">{user.email}</p>
                        </div>
                        <div className="grid gap-1">
                            <Label className="text-gray-500 text-xs uppercase">Cargo / Função</Label>
                            <p className="text-lg font-medium capitalize">{user.role}</p>
                        </div>
                        <div className="grid gap-1">
                            <Label className="text-gray-500 text-xs uppercase">ID do Usuário</Label>
                            <p className="text-sm font-mono text-gray-400">{user.id}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Alteração de Senha */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-primary-500" />
                            Segurança
                        </CardTitle>
                        <CardDescription>
                            Altere sua senha de acesso ao sistema.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nova Senha</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {message && (
                                <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                    {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    {message.text}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Atualizando...
                                    </>
                                ) : 'Atualizar Senha'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

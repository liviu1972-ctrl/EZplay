"use client"

import * as React from "react"
import { useTransition, useState } from "react"
import { updateUserRole } from "./actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface UsersTableClientProps {
  users: any[]
  dict: any
  currentUserId: string
}

const ROLES = ["builder", "founder", "facilitator", "organizer", "mentor", "admin"]

export function UsersTableClient({ users, dict, currentUserId }: UsersTableClientProps) {
  const [isPending, startTransition] = useTransition()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleRoleChange = (userId: string, newRole: string) => {
    setUpdatingId(userId)
    startTransition(async () => {
      await updateUserRole(userId, newRole)
      setUpdatingId(null)
    })
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
      case "superadmin":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/80"
      case "mentor":
      case "organizer":
        return "bg-brand-blue text-white hover:bg-brand-blue/80"
      case "founder":
        return "bg-brand-orange text-white hover:bg-brand-orange/80"
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{dict.admin.name}</TableHead>
              <TableHead>Rol Curent</TableHead>
              <TableHead>Stare Onboarding</TableHead>
              <TableHead>{dict.admin.created}</TableHead>
              <TableHead className="text-right">{dict.admin.editRole}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.display_name || "N/A"}
                  {user.id === currentUserId && (
                    <span className="ml-2 text-xs text-muted-foreground">(Tu)</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.onboarding_completed ? (
                    <Badge variant="outline" className="text-brand-green border-brand-green/20 bg-brand-green/10">Complet</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">În așteptare</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Select
                    defaultValue={user.role}
                    onValueChange={(val) => handleRoleChange(user.id, val)}
                    disabled={isPending || user.id === currentUserId}
                  >
                    <SelectTrigger className="w-[140px] ml-auto">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          <span className="capitalize">{role}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nu au fost găsiți utilizatori.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

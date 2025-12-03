'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import EmptyState from '@/components/admin/EmptyState';
import { mockAdminUsers } from '@/lib/mockAdminData';
import { Users as UsersIcon, Search } from 'lucide-react';
import styles from '@/styles/pages/admin/UsersList.module.css';

const SUPER_ADMIN_UID = 'admin-uid-1'; // Hardcoded super admin

export default function UsersListPage() {
    const [users] = useState(mockAdminUsers);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRoleChange = (uid: string, displayName: string, currentRole: string) => {
        // Check if current user is super admin (mock check)
        const currentUserUid = SUPER_ADMIN_UID; // In real app, get from auth

        if (currentUserUid !== SUPER_ADMIN_UID) {
            alert('Solo el super administrador puede cambiar roles');
            return;
        }

        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const action = newRole === 'admin' ? 'hacer administrador a' : 'quitar rol de administrador a';

        if (confirm(`¿Estás seguro de ${action} ${displayName}?\n\nLos administradores tienen acceso completo al panel.`)) {
            alert(`Rol actualizado a "${newRole}" (mock)`);
        }
    };

    return (
        <AdminLayout title="Usuarios">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.searchWrapper}>
                        <Search size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                {filteredUsers.length === 0 ? (
                    <EmptyState
                        icon={UsersIcon}
                        title="No hay usuarios"
                        description={searchQuery ? 'No se encontraron usuarios' : 'Aún no hay usuarios registrados'}
                    />
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Fecha de registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.uid}>
                                        <td>
                                            <div className={styles.avatar}>
                                                {user.displayName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                            </div>
                                        </td>
                                        <td>{user.displayName || '-'}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.admin : styles.user}`}>
                                                {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString('es-CO')}</td>
                                        <td>
                                            {user.uid !== SUPER_ADMIN_UID && (
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.uid, user.displayName || user.email, user.role)}
                                                    className={styles.roleSelect}
                                                >
                                                    <option value="user">Usuario</option>
                                                    <option value="admin">Administrador</option>
                                                </select>
                                            )}
                                            {user.uid === SUPER_ADMIN_UID && (
                                                <span className={styles.superAdminLabel}>Super Admin</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { Book, Gift, TrendingUp, Users } from 'lucide-react';
import styles from '@/styles/pages/admin/Dashboard.module.css';

export default function AdminDashboard() {
    return (
        <AdminLayout title="Dashboard">
            <div className={styles.container}>
                {/* Metrics */}
                <div className={styles.metricsGrid}>
                    <StatCard
                        icon={Book}
                        value="48"
                        label="Total de libros"
                        sublabel="+3 este mes"
                        color="primary"
                    />
                    <StatCard
                        icon={Gift}
                        value="12"
                        label="Libros gratuitos"
                        color="success"
                    />
                    <StatCard
                        icon={TrendingUp}
                        value="24"
                        label="Libros vendidos"
                        sublabel="$1.250.000 COP"
                        color="secondary"
                    />
                    <StatCard
                        icon={Users}
                        value="156"
                        label="Usuarios totales"
                        sublabel="+8 esta semana"
                        color="primary"
                    />
                </div>

                {/* Quick Actions */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Accesos rápidos</h2>
                    <div className={styles.quickActions}>
                        <a href="/admin/libros/crear" className={styles.quickAction}>
                            <Book size={24} />
                            <span>Crear nuevo libro</span>
                        </a>
                        <a href="/admin/pedidos" className={styles.quickAction}>
                            <TrendingUp size={24} />
                            <span>Ver todos los pedidos</span>
                        </a>
                        <a href="/admin/categorias" className={styles.quickAction}>
                            <Gift size={24} />
                            <span>Gestionar categorías</span>
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

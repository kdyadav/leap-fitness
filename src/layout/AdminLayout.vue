<template>
    <div class="admin-layout">
        <Navbar />
        <div class="admin-container">
            <aside class="admin-sidebar">
                <ul class="sidebar-menu">
                    <li><router-link to="/admin">Dashboard</router-link></li>
                    <li><router-link to="/admin/users">Users</router-link></li>
                    <li><router-link to="/admin/settings">Settings</router-link></li>
                </ul>
            </aside>
            <main class="admin-main">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
    name: 'AdminLayout',
    components: {
        Navbar
    }
}
</script>

<style scoped>
.admin-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.admin-container {
    display: flex;
    flex: 1;
}

.admin-sidebar {
    width: 250px;
    background-color: #f8f9fa;
    border-right: 1px solid #ddd;
    padding: 2rem 0;
}

.sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-menu li {
    margin: 0;
}

.sidebar-menu a {
    display: block;
    padding: 1rem 1.5rem;
    color: #333;
    text-decoration: none;
    transition: background-color 0.3s;
}

.sidebar-menu a:hover,
.sidebar-menu a.router-link-active {
    background-color: #e9ecef;
    color: #007bff;
    font-weight: bold;
}

.admin-main {
    flex: 1;
    padding: 2rem;
}
</style>

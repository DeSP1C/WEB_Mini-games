import AuthModel from "../models/AuthModel.js";

export default class AuthController {
    constructor() {
        this.model = new AuthModel();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuth();
    }

    checkAuth() {
        const protectedPages = ['profile.html', 'snake.html', 'tictactoe.html', 'minesweeper.html'];
        const currentPage = window.location.pathname.split('/').pop();

        if (!this.model.isAuthenticated() && protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
            return;
        }

        const profileLinks = document.querySelectorAll('a[href="profile.html"]');
        const likeButtons = document.querySelectorAll('.like-btn');

        if (!this.model.isAuthenticated()) {
            profileLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = 'login.html';
                });
            });

            likeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = 'login.html';
                });
            });
        }
    }

    setupEventListeners() {
        const registerForm = document.getElementById('registration_form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(registerForm);
                const userData = {
                    username: formData.get('username'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    confirmPassword: formData.get('confirmPassword')
                };

                try {
                    if (userData.password !== userData.confirmPassword) {
                        throw new Error('Паролі не співпадають');
                    }
                    this.model.register(userData);
                    window.location.href = 'profile.html';
                } catch (error) {
                    alert(error.message);
                }
            });
        }

        const loginForm = document.querySelector('.registration_form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(loginForm);
                try {
                    this.model.login(formData.get('email'), formData.get('password'));
                    window.location.href = 'profile.html';
                } catch (error) {
                    // Показываем ошибку в красивом блоке над формой
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'alert alert-danger';
                    errorDiv.textContent = error.message;
                    
                    const container = loginForm.closest('.registration-form-container');
                    const existingError = container.querySelector('.alert');
                    if (existingError) {
                        existingError.remove();
                    }
                    container.insertBefore(errorDiv, loginForm);
                }
            });
        }

        const logoutLink = document.querySelector('a[href="#logout"]');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.model.logout();
                window.location.href = 'login.html';
            });
        }
    }
}
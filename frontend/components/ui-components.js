/**
 * Reusable form component for text input
 */

class TextInputComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            placeholder: options.placeholder || 'Digite seu texto aqui...',
            maxLength: options.maxLength || 5000,
            showWordCount: options.showWordCount || true,
            autoResize: options.autoResize || true,
            ...options
        };
        
        this.render();
    }

    render() {
        const html = `
            <div class="text-input-component">
                <textarea 
                    class="text-input"
                    placeholder="${this.options.placeholder}"
                    maxlength="${this.options.maxLength}"
                    rows="6"
                ></textarea>
                ${this.options.showWordCount ? '<div class="word-count">0 palavras</div>' : ''}
            </div>
        `;
        
        this.container.innerHTML = html;
        this.textarea = this.container.querySelector('.text-input');
        this.wordCountDiv = this.container.querySelector('.word-count');
        
        this.bindEvents();
    }

    bindEvents() {
        if (this.options.autoResize) {
            this.textarea.addEventListener('input', () => {
                this.textarea.style.height = 'auto';
                this.textarea.style.height = this.textarea.scrollHeight + 'px';
            });
        }

        if (this.options.showWordCount) {
            this.textarea.addEventListener('input', () => {
                const wordCount = this.getWordCount();
                this.wordCountDiv.textContent = `${wordCount} palavras`;
            });
        }
    }

    getWordCount() {
        return this.textarea.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    getValue() {
        return this.textarea.value;
    }

    setValue(value) {
        this.textarea.value = value;
        if (this.options.showWordCount) {
            const wordCount = this.getWordCount();
            this.wordCountDiv.textContent = `${wordCount} palavras`;
        }
    }
}

/**
 * Loading spinner component
 */
class LoadingSpinner {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    show() {
        this.container.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <div class="loading-text">Processando...</div>
            </div>
        `;
        this.container.style.display = 'block';
    }

    hide() {
        this.container.style.display = 'none';
        this.container.innerHTML = '';
    }
}

/**
 * Alert component for notifications
 */
class Alert {
    static show(message, type = 'info', duration = 5000) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <span class="alert-icon">${this.getIcon(type)}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close">&times;</button>
        `;

        document.body.appendChild(alertDiv);

        // Position at top-right
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';

        // Close button functionality
        alertDiv.querySelector('.alert-close').addEventListener('click', () => {
            this.remove(alertDiv);
        });

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.remove(alertDiv);
            }, duration);
        }

        return alertDiv;
    }

    static getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    static remove(alertDiv) {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.3s';
            setTimeout(() => {
                alertDiv.parentNode.removeChild(alertDiv);
            }, 300);
        }
    }
}

// Export components globally
window.TextInputComponent = TextInputComponent;
window.LoadingSpinner = LoadingSpinner;
window.Alert = Alert;
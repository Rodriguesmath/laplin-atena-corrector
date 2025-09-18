/**
 * JavaScript for the text corrector functionality
 */

class TextCorrector {
    constructor() {
        this.form = document.getElementById('correctionForm');
        this.resultsSection = document.getElementById('results');
        this.submitButton = this.form.querySelector('.submit-btn');
        this.originalButtonText = this.submitButton.innerHTML;
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add character count for textarea
        const textarea = document.getElementById('inputText');
        this.addCharacterCount(textarea);
        
        // Add auto-resize for textarea
        this.addAutoResize(textarea);
    }

    /**
     * Handle form submission
     */
    async handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            text: formData.get('text'),
            language: formData.get('language'),
            correction_type: formData.get('correction_type')
        };

        try {
            LaplinUtils.showLoading(this.submitButton);
            
            const response = await fetch('/api/correct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            this.displayResults(result);
            
        } catch (error) {
            console.error('Error:', error);
            LaplinUtils.showError(
                'Erro ao processar o texto. Tente novamente mais tarde.',
                this.form
            );
        } finally {
            LaplinUtils.hideLoading(this.submitButton, this.originalButtonText);
        }
    }

    /**
     * Display correction results
     */
    displayResults(result) {
        // Show results section
        this.resultsSection.style.display = 'block';
        
        // Populate results
        document.getElementById('originalText').innerHTML = this.escapeHtml(result.original_text);
        document.getElementById('correctedText').innerHTML = this.escapeHtml(result.corrected_text);
        
        // Populate suggestions
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';
        
        if (result.suggestions && result.suggestions.length > 0) {
            result.suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                suggestionsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'Nenhuma sugestão adicional encontrada.';
            suggestionsList.appendChild(li);
        }

        // Add confidence score if available
        if (result.confidence_score) {
            const confidenceDiv = document.createElement('div');
            confidenceDiv.className = 'confidence-score';
            confidenceDiv.innerHTML = `
                <strong>Nível de confiança:</strong> ${Math.round(result.confidence_score * 100)}%
            `;
            this.resultsSection.querySelector('.result-content').appendChild(confidenceDiv);
        }

        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Show success message
        LaplinUtils.showSuccess('Texto processado com sucesso!', this.form);
    }

    /**
     * Add character count to textarea
     */
    addCharacterCount(textarea) {
        const countDiv = document.createElement('div');
        countDiv.className = 'char-count';
        countDiv.style.textAlign = 'right';
        countDiv.style.fontSize = '0.9em';
        countDiv.style.color = '#666';
        countDiv.style.marginTop = '0.5rem';
        
        textarea.parentNode.insertBefore(countDiv, textarea.nextSibling);

        const updateCount = () => {
            const count = textarea.value.length;
            countDiv.textContent = `${count} caracteres`;
        };

        textarea.addEventListener('input', updateCount);
        updateCount(); // Initial count
    }

    /**
     * Add auto-resize functionality to textarea
     */
    addAutoResize(textarea) {
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Copy text to clipboard
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            LaplinUtils.showSuccess('Texto copiado para a área de transferência!', this.form);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            LaplinUtils.showError('Erro ao copiar texto.', this.form);
        });
    }
}

// Initialize corrector when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('correctionForm')) {
        new TextCorrector();
    }
});

// Add copy buttons to results
document.addEventListener('DOMContentLoaded', function() {
    // Add copy button to corrected text
    const correctedTextDiv = document.getElementById('correctedText');
    if (correctedTextDiv) {
        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '📋 Copiar';
        copyButton.style.marginTop = '1rem';
        copyButton.style.padding = '0.5rem 1rem';
        copyButton.style.backgroundColor = '#3498db';
        copyButton.style.color = 'white';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '3px';
        copyButton.style.cursor = 'pointer';
        
        copyButton.addEventListener('click', function() {
            const corrector = new TextCorrector();
            corrector.copyToClipboard(correctedTextDiv.textContent);
        });
        
        correctedTextDiv.parentNode.appendChild(copyButton);
    }
});
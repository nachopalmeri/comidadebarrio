/**
 * COMIDA DE BARRIO - Validación de Formulario de Contacto
 * Validaciones en tiempo real y al enviar
 */

(function() {
  'use strict';

  // Obtener el formulario
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Obtener todos los campos
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  const asunto = document.getElementById('asunto');
  const mensaje = document.getElementById('mensaje');
  const consentimiento = document.getElementById('consentimiento');
  const charCount = document.getElementById('charCount');
  const successMessage = document.getElementById('successMessage');

  /**
   * Valida un campo y muestra errores
   * @param {HTMLElement} field - Campo a validar
   * @param {Function} validator - Función de validación
   * @param {string} errorMessage - Mensaje de error
   * @returns {boolean} True si es válido
   */
  function validateField(field, validator, errorMessage) {
    const errorElement = document.getElementById(field.id + 'Error');
    const isValid = validator(field.value);
    
    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      field.setAttribute('aria-invalid', 'false');
      if (errorElement) {
        errorElement.textContent = '';
      }
      return true;
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      if (errorElement) {
        errorElement.textContent = errorMessage;
      }
      return false;
    }
  }

  /**
   * Validadores individuales
   */
  const validators = {
    nombre: function(value) {
      return value.trim().length >= 3 && value.trim().length <= 50;
    },
    
    email: function(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    
    telefono: function(value) {
      if (!value.trim()) return true; // Opcional
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 8;
    },
    
    asunto: function(value) {
      return value !== '';
    },
    
    mensaje: function(value) {
      return value.trim().length >= 10 && value.trim().length <= 500;
    },
    
    consentimiento: function(checked) {
      return checked;
    }
  };

  /**
   * Mensajes de error
   */
  const errorMessages = {
    nombre: 'El nombre debe tener entre 3 y 50 caracteres',
    email: 'Ingresa un correo electrónico válido',
    telefono: 'Ingresa un teléfono válido (mínimo 8 dígitos)',
    asunto: 'Selecciona un asunto',
    mensaje: 'El mensaje debe tener entre 10 y 500 caracteres',
    consentimiento: 'Debes aceptar el consentimiento para continuar'
  };

  /**
   * Validación en tiempo real
   */
  nombre.addEventListener('blur', function() {
    validateField(nombre, validators.nombre, errorMessages.nombre);
  });

  email.addEventListener('blur', function() {
    validateField(email, validators.email, errorMessages.email);
  });

  telefono.addEventListener('blur', function() {
    if (telefono.value.trim()) {
      validateField(telefono, validators.telefono, errorMessages.telefono);
    }
  });

  asunto.addEventListener('change', function() {
    validateField(asunto, validators.asunto, errorMessages.asunto);
  });

  mensaje.addEventListener('input', function() {
    // Actualizar contador de caracteres
    if (charCount) {
      charCount.textContent = mensaje.value.length;
      if (mensaje.value.length > 500) {
        charCount.classList.add('text-danger');
      } else {
        charCount.classList.remove('text-danger');
      }
    }
    
    // Validar si ya tiene contenido
    if (mensaje.value.trim().length > 0) {
      validateField(mensaje, validators.mensaje, errorMessages.mensaje);
    }
  });

  mensaje.addEventListener('blur', function() {
    validateField(mensaje, validators.mensaje, errorMessages.mensaje);
  });

  consentimiento.addEventListener('change', function() {
    validateField(consentimiento, validators.consentimiento, errorMessages.consentimiento);
  });

  /**
   * Validación al enviar el formulario
   */
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Validar todos los campos
    let isValid = true;

    isValid = validateField(nombre, validators.nombre, errorMessages.nombre) && isValid;
    isValid = validateField(email, validators.email, errorMessages.email) && isValid;
    
    if (telefono.value.trim()) {
      isValid = validateField(telefono, validators.telefono, errorMessages.telefono) && isValid;
    }
    
    isValid = validateField(asunto, validators.asunto, errorMessages.asunto) && isValid;
    isValid = validateField(mensaje, validators.mensaje, errorMessages.mensaje) && isValid;
    isValid = validateField(consentimiento, validators.consentimiento, errorMessages.consentimiento) && isValid;

    if (isValid) {
      // Simular envío del formulario
      console.log('Formulario válido, enviando...', {
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        asunto: asunto.value,
        mensaje: mensaje.value,
        consentimiento: consentimiento.checked
      });

      // Mostrar mensaje de éxito
      if (successMessage) {
        successMessage.classList.remove('d-none');
        form.reset();
        
        // Limpiar clases de validación
        form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
          field.classList.remove('is-valid', 'is-invalid');
        });
        
        // Resetear contador
        if (charCount) {
          charCount.textContent = '0';
          charCount.classList.remove('text-danger');
        }
        
        // Scroll al mensaje de éxito
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          successMessage.classList.add('d-none');
        }, 5000);
      }
    } else {
      // Enfocar el primer campo con error
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    form.classList.add('was-validated');
  });

  // Inicializar contador de caracteres
  if (charCount && mensaje) {
    charCount.textContent = mensaje.value.length;
  }

})();


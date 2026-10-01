/**
 * Validadores reutilizáveis para react-hook-form.
 * Uso: <input {...register('email', validators.email)} />
 */

export const validators = {
  required: (msg = 'Campo obrigatório') => ({ required: msg }),

  email: {
    required: 'E-mail é obrigatório',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Informe um e-mail válido',
    },
  },

  telefone: {
    pattern: {
      value: /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/,
      message: 'Informe um telefone válido',
    },
  },

  cpf: {
    validate: (value) => {
      if (!value) return true
      const digits = value.replace(/\D/g, '')
      if (digits.length !== 11) return 'CPF inválido'
      // Dígitos verificadores
      let sum = 0
      for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i)
      let r = (sum * 10) % 11
      if (r === 10 || r === 11) r = 0
      if (r !== parseInt(digits[9])) return 'CPF inválido'
      sum = 0
      for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i)
      r = (sum * 10) % 11
      if (r === 10 || r === 11) r = 0
      if (r !== parseInt(digits[10])) return 'CPF inválido'
      return true
    },
  },

  minLength: (min, msg) => ({
    minLength: { value: min, message: msg ?? `Mínimo ${min} caracteres` },
  }),

  maxLength: (max, msg) => ({
    maxLength: { value: max, message: msg ?? `Máximo ${max} caracteres` },
  }),

  fileSize: (maxMB = 5) => ({
    validate: (files) => {
      if (!files?.[0]) return true
      return files[0].size <= maxMB * 1_024 * 1_024 || `Arquivo deve ter no máximo ${maxMB}MB`
    },
  }),

  fileType: (types = ['application/pdf']) => ({
    validate: (files) => {
      if (!files?.[0]) return true
      return types.includes(files[0].type) || `Formato inválido. Aceitos: ${types.join(', ')}`
    },
  }),
}

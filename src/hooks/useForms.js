import { useState } from 'react';

export const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate if schema provided
      if (validationSchema) {
        const { error } = validationSchema.validate(values, { abortEarly: false });
        if (error) {
          const validationErrors = {};
          error.details.forEach(detail => {
            validationErrors[detail.path[0]] = detail.message;
          });
          setErrors(validationErrors);
          return;
        }
      }

      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  const setValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setValue,
    setError: (name, error) => setErrors(prev => ({ ...prev, [name]: error }))
  };
};

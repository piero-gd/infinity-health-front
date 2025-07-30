import { useState } from 'react';
import { updatePersonalInfo } from '../services/apiPersonalInfo';
import type { PersonalInfoPayload } from '../type';

export function useForm(initialValues: PersonalInfoPayload) {
  const [values, setValues] = useState<PersonalInfoPayload>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await updatePersonalInfo(values);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Error updating personal info');
    } finally {
      setLoading(false);
    }
  };

  return { values, handleChange, handleSubmit, loading, error, success, setValues };
}
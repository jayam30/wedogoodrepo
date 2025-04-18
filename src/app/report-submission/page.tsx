

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function ReportSubmissionPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    ngoId: '',
    month: '',
    peopleHelped: '',
    eventsConducted: '',
    fundsUtilized: '',
  });

  const [errors, setErrors] = useState({
    ngoId: false,
    month: false,
    peopleHelped: false,
    eventsConducted: false,
    fundsUtilized: false,
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'month':
        return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
      case 'peopleHelped':
      case 'eventsConducted':
      case 'fundsUtilized':
        return /^\d+$/.test(value); 
      default:
        return value.trim() !== '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: !validateField(name, value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      ngoId: !validateField('ngoId', formData.ngoId),
      month: !validateField('month', formData.month),
      peopleHelped: !validateField('peopleHelped', formData.peopleHelped),
      eventsConducted: !validateField('eventsConducted', formData.eventsConducted),
      fundsUtilized: !validateField('fundsUtilized', formData.fundsUtilized),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e);
    if (hasErrors) return;

    try {
      const res = await fetch('http://localhost:5000/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          peopleHelped: Number(formData.peopleHelped),
          eventsConducted: Number(formData.eventsConducted),
          fundsUtilized: Number(formData.fundsUtilized),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Report submitted successfully!');
        setFormData({
          ngoId: '',
          month: '',
          peopleHelped: '',
          eventsConducted: '',
          fundsUtilized: '',
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert('Failed to submit report. Server error.');
      console.error(err);
    }
  };

  const fieldDetails = [
    { label: 'NGO ID', name: 'ngoId', placeholder: 'e.g., NGO123' },
    { label: 'Month (YYYY-MM)', name: 'month', placeholder: 'e.g., 2024-04' },
    { label: 'People Helped', name: 'peopleHelped', placeholder: 'e.g., 150' },
    { label: 'Events Conducted', name: 'eventsConducted', placeholder: 'e.g., 5' },
    { label: 'Funds Utilized (₹)', name: 'fundsUtilized', placeholder: 'e.g., 10000' },
  ];

  return (
    <main className="min-h-screen bg-[#0c0c0b] px-4 py-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl font-bold text-[#f4a300] mb-6 text-center"
        >
          Report Submission Form
        </motion.h2>

                <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          type="button"
          className="mb-6 w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl shadow-sm transition duration-300"
        >
          Go to Home
        </motion.button>


        <form onSubmit={handleSubmit} className="space-y-6">
          {fieldDetails.map(({ label, name, placeholder }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={(formData as Record<string, string>)[name] || ''}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-2 ${
                  errors[name as keyof typeof errors]
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-[#f4a300]'
                }`}
              />
              {errors[name as keyof typeof errors] && (
                <p className="text-red-500 text-sm mt-1">Invalid {label.toLowerCase()}</p>
              )}
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#f4a300] text-white font-semibold py-3 rounded-xl shadow-lg mt-4 transition duration-300"
          >
            Submit Report
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '../api';

interface FlagProps {
    id: string;          // country id or name
    h?: number;          // height (optional)
    w?: number;          // width (optional)
}

export default function Flag({ id, h = 28, w = 28 }: FlagProps) {
    const [flag, setFlag] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();

        const fetchCountries = async () => {
            try {
                const response: any = await api.get('core/countries/', {
                    signal: controller.signal,
                });

                const country = response.countries.find(
                    (c: any) => c.id === id || c.name === id
                );

                if (country?.flag) {
                    setFlag(country.flag);
                }
            } catch (err: any) {
                if (err.name !== 'CanceledError') {
                    console.error('API Error:', err);
                }
            }
        };

        fetchCountries();
        return () => controller.abort();
    }, [id]);

    if (!flag) return null; // or a placeholder

    return (
        <div
            style={{
                width: `${w}px`,
                height: `${h}px`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible',
            }}
        >
            <img
                src={flag}
                alt={id}
                style={{
                    width: `${w}px`,
                    height: `${h}px`,
                    minWidth: `${w}px`,
                    minHeight: `${h}px`,
                    maxWidth: 'none',
                    maxHeight: 'none',
                    objectFit: 'contain',
                    display: 'block',
                }}
            />
        </div>
    );
}

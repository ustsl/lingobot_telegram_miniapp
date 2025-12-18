'use client';

import styles from './WordAnalyticsWidget.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useBaseStore } from '@/store/useStore';
import { getWordAnalytics, type WordAnalytics } from '@/api/serverResponse';

export const WordAnalyticsWidget = () => {
    const userId = useBaseStore((s: any) => s.userId) as string | number | undefined;
    const pair = useBaseStore((state: any) => state.pair)

    const [data, setData] = useState<WordAnalytics | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const hasId = Boolean(userId);

    useEffect(() => {
        if (!hasId) return;
        let canceled = false;

        getWordAnalytics(String(userId), String(pair))
            .then((d) => !canceled && setData(d))
            .catch((e) => !canceled && setErr(e?.message || 'error'));

        return () => {
            canceled = true;
        };
    }, [hasId, userId]);

    const safe: WordAnalytics = data ?? { total: 0, finished: 0, learning: 0, passive: 0 };

    const segments = useMemo(
        () => [
            { key: 'passive', value: safe.passive, color: '#9E9E9E', label: 'Пассивный запас' },
            { key: 'learning', value: safe.learning, color: '#FFC107', label: 'Требует повтора' },
            { key: 'finished', value: safe.finished, color: '#4CAF50', label: 'Уверенный запас' },
        ],
        [safe.passive, safe.learning, safe.finished]
    );

    const size = 100;
    const stroke = 18;
    const r = (size - stroke) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const C = 2 * Math.PI * r;
    const total = Math.max(safe.total, 1);
    const EPS = 0.0001;

    // Не рендерим, если total == 0
    if (data && data.total === 0) return null;

    let offset = 0;

    return (
        <div className={styles.container}>
            <svg
                className={styles.chart}
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                role="img"
                aria-label="Word analytics"
            >
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eee" strokeWidth={stroke} />
                {segments.map((s) => {
                    const frac = s.value / total;
                    const len = Math.min(Math.max(frac * C, EPS), C - EPS);
                    const dash = `${len} ${C - len}`;
                    const node = (
                        <circle
                            key={s.key}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill="none"
                            stroke={s.color}
                            strokeWidth={stroke}
                            strokeLinecap="butt"
                            strokeDasharray={dash}
                            strokeDashoffset={-offset}
                            transform={`rotate(-90 ${cx} ${cy})`}
                            className={styles.segment}
                        />
                    );
                    offset += len;
                    return node;
                })}
                <circle cx={cx} cy={cy} r={r - stroke / 1.6} className={styles.center} />
                <text x={cx} y={cy - 3} textAnchor="middle" className={styles.totalNumber}>
                    {safe.total || (hasId ? '…' : '0')}
                </text>
                <text x={cx} y={cy + 14} textAnchor="middle" className={styles.totalLabel}>
                    всего
                </text>
            </svg>

            <div className={styles.legend}>
                {!hasId && <div className={styles.muted}>нет telegram_id</div>}
                {hasId && err && <div className={styles.error}>ошибка: {err}</div>}
                {hasId && !err && !data && <div className={styles.loading}>загрузка…</div>}

                {hasId &&
                    !err &&
                    data &&
                    segments.map((s) => {
                        const pct = safe.total ? Math.round((s.value / safe.total) * 100) : 0;
                        return (
                            <div key={s.key} className={styles.legendRow}>
                                <span className={styles.colorBox} style={{ background: s.color }} />
                                <span className={styles.legendLabel}>{s.label}</span>
                                <span className={styles.legendValue}>{s.value}</span>
                                <span className={styles.legendPct}>{pct}%</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

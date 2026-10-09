'use client';
import React from 'react'
import Link from 'next/link';
import styles from './style.module.scss';

export default function index({index, title, subtitle, href, manageModal}) {

    return (
        <Link
            href={href}
            onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}}
            onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}}
            className={styles.project}
        >
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </Link>
    )
}

import React from 'react';
import { Collection } from '@/lib/types';
import CollectionCard from './CollectionCard';
import styles from '@/styles/components/CollectionsGrid.module.css';

interface CollectionsGridProps {
    collections: Collection[];
}

export default function CollectionsGrid({ collections }: CollectionsGridProps) {
    return (
        <div className={styles.grid}>
            {collections.map(collection => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div>
    );
}

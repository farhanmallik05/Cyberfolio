"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    onSearch: (query: string) => void;
}

export function FilterBar({ categories, activeCategory, onCategoryChange, onSearch }: FilterBarProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    const clearSearch = () => {
        setSearchQuery("");
        onSearch("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchWrapper}>
                <Search className="w-4 h-4 text-mech-cyan/60 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="SCANNING REPOSITORIES..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
                {searchQuery && (
                    <button 
                        onClick={clearSearch} 
                        className={styles.clearButton}
                        aria-label="Clear Search"
                        title="Clear Search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className={styles.filtersWrapper}>
                <div className={styles.categories}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`${styles.categoryTab} ${activeCategory === cat ? styles.active : ""}`}
                        >
                            <span className={styles.glitchText} data-text={cat.toUpperCase()}>
                                {cat.toUpperCase()}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

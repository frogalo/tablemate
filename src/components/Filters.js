// components/Filters.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faFilter,
    faSortAmountDown,
    faSortAmountUp,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";

export default function Filters({
                                    filterText,
                                    setFilterText,
                                    filterOptions,
                                    selectedFilter,
                                    setSelectedFilter,
                                    sortField,
                                    sortDirection,
                                    handleSort,
                                    clearFilters,
                                    totalCount,
                                    filteredCount,
                                    customFilters,
                                }) {
    return (
        <div className="bg-card-bg rounded-lg p-4 mb-6 shadow-sm border border-neutral/20 bg-[var(--card-bg)] ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="text-neutral" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="bg-third text-primary border border-neutral/30 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Dropdown Filter */}
                    {filterOptions && (
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faFilter} className="text-neutral" />
                                </div>
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className="cursor-pointer bg-third text-primary border border-neutral/30 rounded-md py-2 pl-10 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    {filterOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Custom Filters */}
                    {customFilters && customFilters}
                </div>

                <div className="flex items-center gap-2">
                    {/* Sort Button */}
                    {sortField && (
                        <button
                            onClick={() => handleSort(sortField)}
                            className={`cursor-pointer px-3 py-2 rounded-md text-sm flex items-center ${
                                sortField ? "bg-primary/10 text-primary" : "hover:bg-third"
                            }`}
                        >
                            <span className="mr-2">Sort by {sortField}</span>
                            <FontAwesomeIcon
                                icon={sortDirection === "asc" ? faSortAmountUp : faSortAmountDown}
                                className="opacity-100"
                            />
                        </button>
                    )}

                    {/* Clear Filters Button */}
                    <button
                        onClick={clearFilters}
                        className="cursor-pointer px-3 py-2 rounded-md text-sm text-primary hover:bg-primary/10 flex items-center"
                    >
                        <FontAwesomeIcon icon={faUndo} className="mr-2" />
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Results count */}
            {(totalCount !== undefined && filteredCount !== undefined) && (
                <div className="mt-3 text-sm text-neutral">
                    Showing {filteredCount} of {totalCount} items
                </div>
            )}
        </div>
    );
}

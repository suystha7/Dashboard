

export default function Filter({
    selectedStatus,
    selectedFeatured,
    selectedSort,
    searchTerm,
    onSearchChange,
    handleFilterChange,
    totalcount
  }) {
    return (
      <div className="flex justify-between items-center p-2 border-b">
        <div className="mb-2">
          <span className="font-semibold">{totalcount}</span> items
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
  
          <select
            name="featured"
            id="featured"
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedFeatured}
            onChange={(e) => handleFilterChange("is_featured", e.target.value)}
          >
            <option value="all">All Featured</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
  
          <select
            name="status"
            id="status"
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
  
          <select
            name="created_at"
            id="created_at"
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={selectedSort}
            onChange={(e) => handleFilterChange("created_at", e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="oldest">Oldest Date</option>
            <option value="latest">Latest Date</option>
          </select>
        </div>
      </div>
    );
  }
  






import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import axios from "axios";
import DeleteRouteModal from "./DeleteRouteModal";
// import AddBusUser from "./AddBusUser";

interface RouteInterface {
  routeId: number;
  source: string;
  destination: string;
  distance: number;
}

const getAllRoutes = async (setRoutes: React.Dispatch<React.SetStateAction<RouteInterface[]>>) => {
  try {
    const response = await axios.get('http://localhost:8080/admin/routes/get', {
      withCredentials: true,
    });
    setRoutes(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const RouteDetail: React.FC = () => {
  const [routes, setRoutes] = useState<RouteInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showDeleteRouteModal, setShowDeleteRouteModal] = useState(false);
  const [deleteRouteId, setDeleteRouteId] = useState<number | null>(null); 
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const filteredRoutes = routes.filter((route) =>
    route.source.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleDeleteRoute = async () => {
    if (deleteRouteId === null) return;
  
    try {
      console.log(`Deleting route with ID: ${deleteRouteId}`);
  
      const response = await axios.delete(
        `http://localhost:8080/admin/routes/delete/${deleteRouteId}`,
        {
          withCredentials: true,
        }
      );
  
      console.log("Delete response:", response);
  
      // Set the response message to the state
      setDeleteMessage(response.data);  // Assuming the server sends a string message
  
      setRoutes(routes.filter((route) => route.routeId !== deleteRouteId));
  
      setShowDeleteRouteModal(false);
      setDeleteRouteId(null); // Reset the deleteRouteId state
    } catch (error) {
      console.error("Error deleting route:", error);
      setDeleteMessage("Error deleting the route. Please try again.");
    }
  };
  
  const handleDeleteClick = (routeId: number) => {
    setDeleteRouteId(routeId); // Set the deleteRouteId
    setShowDeleteRouteModal(true); // Show the delete modal
  };

  useEffect(() => {
    getAllRoutes(setRoutes);
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Routes</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Routes: {filteredRoutes.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Routes"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Filter By Status:
            </span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              data-control="select2"
              data-placeholder="All"
              data-hide-search="true"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value=""></option>
              <option value="1">All</option>
              <option value="2">Passenger</option>
              <option value="3">Driver</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => {/* Open Add Route Modal */}}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Route
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Id</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((route, index) => (
                  <tr key={`${route.routeId}-${index}`}>
                    <td>{route.routeId}</td>
                    <td>{route.source}</td>
                    <td>{route.destination}</td>
                    <td>{route.distance}</td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button className="btn btn-icon btn-bg-light btn-sm me-1">
                          <i className="ki-duotone ki-eye fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </button>
                        <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                          <i className="ki-duotone ki-pencil fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          onClick={() => handleDeleteClick(route.routeId)} // Trigger the correct routeId
                        >
                          <i className="ki-duotone ki-trash fs-3 text-danger">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredRoutes.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Delete Route Modal */}
      {showDeleteRouteModal && deleteRouteId !== null && (
        <DeleteRouteModal
          show={showDeleteRouteModal}
          onClose={() => setShowDeleteRouteModal(false)}
          onDelete={handleDeleteRoute}
          itemName="this route"
        />
      )}
      {deleteMessage && (
      <div className="alert alert-info">
        {deleteMessage}
      </div>
    )}
    </div>
  );
};

export default RouteDetail;

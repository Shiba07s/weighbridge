import React, { useEffect, useState } from "react";
import { listSuppliers, deleteSupplier } from "../../services/SupplierService";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import "./ComponentSupplier.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListSupplier = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [suppliers, setSuppliers] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    pageNumber:'',
    pageSize: '',
    totalPages:'',
    totalElements:'',
    lastPage: true,
    // pageNumber: 0,
    // pageSize: 10,
    // totalPages: 1,
    // totalElements: 0,
    // lastPage: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = (pageNumber = 0, pageSize = 10) => {
    listSuppliers(pageNumber, pageSize)
      .then((response) => {
        setSuppliers(response.data.content);
        console.log('pageNumber  :'+ response.data.pageNumber)
        setPaginationInfo({
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          lastPage: response.data.lastPage,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewSupplier = () => {
    navigate("/add-supplier");
  };

  const updateSupplier = (supplierId) => {
    navigate(`/edit-supplier/${supplierId}`);
  };

  const handleDeleteSupplier = (supplierId) => {
    deleteSupplier(supplierId)
      .then((response) => {
        // Remove the deleted supplier from the state
        setSuppliers(
          suppliers.filter((supplier) => supplier.supplierId !== supplierId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const goToFirstPage = () => {
    fetchSuppliers(0);
  };

  const goToLastPage = () => {
    fetchSuppliers(paginationInfo.totalPages - 1);
  };

  return (
    <div className="container mt-3" >
      <h2 className="text-center">List Of Suppliers</h2>
      <button className="btn btn-primary mb-2" onClick={addNewSupplier}>
        Add Supplier
      </button>
      <div className="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Supplier Id</th>
              <th>Supplier Name</th>
              <th>Supplier Address</th>
              <th>Supplier Contact</th>
              <th>Supplier Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplierId}>
                <td>{supplier.supplierId}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.supplierAddress}</td>
                <td>{supplier.supplierContact}</td>
                <td>{supplier.supplierEmail}</td>
                <td>
                  <div>
                    <button
                      className="button-edit task-button"
                      onClick={() => updateSupplier(supplier.supplierId)}
                      style={{ border: "none" }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{
                          color: "orange",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </button>
                    <button
                      className="button-delete task-button"
                      onClick={() =>
                        handleDeleteSupplier(supplier.supplierId)
                      }
                      style={{ border: "none" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          color: "red",
                          width: "20px",
                          height: "20px",
                          marginLeft: "20px",
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination className="text-center mt-2" style={{display: 'flex', justifyContent: 'flex-end'}}>
      <PaginationItem>
          <PaginationLink first onClick={goToFirstPage} />
        </PaginationItem>
         
         <PaginationItem disabled={paginationInfo.pageNumber === 0}>
          <PaginationLink previous onClick={() => fetchSuppliers(paginationInfo.pageNumber - 1)} />
        </PaginationItem>
        {[...Array(paginationInfo.totalPages)].map((_, index) => (
          <PaginationItem key={index} active={index === paginationInfo.pageNumber}>
            <PaginationLink onClick={() => fetchSuppliers(index)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={paginationInfo.lastPage}>
          <PaginationLink next onClick={() => fetchSuppliers(paginationInfo.pageNumber + 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last onClick={goToLastPage} />
        </PaginationItem>
      </Pagination>
     </div>
  );
};

export default ListSupplier;

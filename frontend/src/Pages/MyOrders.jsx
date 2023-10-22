import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../OrderSlices/myOrders';
import { DataGrid} from '@mui/x-data-grid';
const MyOrders = () => {
  const dispatch = useDispatch();
  const myorders = useSelector((state) => state.myOrders.myOrders);
console.log(myorders);
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'Status',
      headerName: ' Payment Status',
      width: 150,
      editable: true,
    },
    {
      field: 'Price',
      headerName: 'Price',
      type: 'number',
      width: 110,
      editable: true,
    },
   
  ];
  

  return (
    <>
    <DataGrid
         rows={myorders.map((order) => ({
          id: order._id,
          Name: order.OrderItems[0].name,
          Status: order.paymentInfo.status,
          Price: order.ItemsPrice,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              PriceSize: 5,
            },
          },
        }}
        pPriceSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </>
  );
};

export default MyOrders;

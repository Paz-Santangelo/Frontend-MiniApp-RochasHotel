/* eslint-disable react/prop-types */
import { Pagination, Stack } from "@mui/material";

const CustomPagination = ({
  roomsPerPage,
  totalRooms,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalRooms / roomsPerPage);

  const handlePageChange = (event, value) => {
    paginate(value);
  };

  return (
    <Stack spacing={3} sx={{ justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        color="primary"
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default CustomPagination;

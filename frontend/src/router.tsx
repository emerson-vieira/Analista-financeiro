import { Box, Flex } from "@chakra-ui/react";
import { Routes, Route} from "react-router-dom";

import { Customer } from "./pages/customer";
import { CreateCustomer } from "./pages/customer/CreateCustomer";
import { UpdateCustomer } from "./pages/customer/UpdateCustomer";

export function Router() {
  return (
    <Box>
      <Flex
        as="header"
        width="full"
        height="16"
        pos="sticky"
        flex="1"
        boxShadow="0 0 12px 0 rgba(0, 0, 0, 0.05)"
        backgroundColor="blue.600"
        zIndex="dropdown"
      />
      <Routes>
        <Route
          path="/"
          element={<Customer />}
          />
        <Route
          path="/clientes/add"
          element={<CreateCustomer />}
        />
        <Route
          path="/clientes/update/:id"
          element={<UpdateCustomer />}
        />
      </Routes>
    </Box>
  );
}
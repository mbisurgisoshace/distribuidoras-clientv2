import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../../features/Home';
import Ruteos from '../../features/Ruteos';
import Login from '../../features/Auth/Login';
import Hoja from '../../features/Ruteos/Hoja';
import Clientes from '../../features/Clientes';
import NewHoja from '../../features/Ruteos/Hoja/NewHoja';
import FormPedido from '../../features/Pedidos/FormPedido';
import FormCliente from '../../features/Clientes/FormCliente';

import { RequireAuth } from '../../features/Auth/ProtectedRoute';

export default function Shell() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/hojas"
          element={
            <RequireAuth>
              <Ruteos />
            </RequireAuth>
          }
        />
        <Route
          path="/hojas/new"
          element={
            <RequireAuth>
              <NewHoja />
            </RequireAuth>
          }
        />
        <Route
          path="/hojas/:hojaId"
          element={
            <RequireAuth>
              <Hoja />
            </RequireAuth>
          }
        />
        <Route
          path="/clientes"
          element={
            <RequireAuth>
              <Clientes />
            </RequireAuth>
          }
        />
        <Route
          path="/clientes/:clienteId"
          element={
            <RequireAuth>
              <FormCliente />
            </RequireAuth>
          }
        />
        <Route
          path="/pedidos/:pedidoId"
          element={
            <RequireAuth>
              <FormPedido />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

import React, { useEffect, useState } from 'react';
import RequestList from './components/RequestList';
import CallComponent from './componets/Call';


export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supervisor Dashboard</h1>
      <CallComponent />
      <RequestList />

    </div>
  );
}

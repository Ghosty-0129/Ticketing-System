import React, { useState } from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';

const AdminPage = () => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingLoad, setLoadingLoad] = useState(false);

  const saveData = async () => {
    setLoadingSave(true);
    try {
      await axios.post('http://localhost:5000/api/save-data');
      notification.success({
        message: 'Save Data',
        description: 'Data has been saved successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Save Data Error',
        description: 'Failed to save data. Please try again later.',
      });
    } finally {
      setLoadingSave(false);
    }
  };

  const loadData = async () => {
    setLoadingLoad(true);
    try {
      await axios.get('http://localhost:5000/api/load-data');
      notification.success({
        message: 'Load Data',
        description: 'Data has been loaded successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Load Data Error',
        description: 'Failed to load data. Please try again later.',
      });
    } finally {
      setLoadingLoad(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Admin Page</h2>
      <Button
        type="primary"
        onClick={saveData}
        loading={loadingSave}
        style={{ marginBottom: '20px', display: 'block' }}
      >
        Save Data
      </Button>

      <Button
        type="default"
        onClick={loadData}
        loading={loadingLoad}
        style={{ marginBottom: '20px', display: 'block' }}
      >
        Load Data
      </Button>
    </div>
  );
};

export default AdminPage;
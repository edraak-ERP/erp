import React, { useState } from 'react';
import DatabaseEngine from '../../core/database/DatabaseEngine';
import { useTranslation } from '../../locales/i18n';

const DatabaseCreator: React.FC = () => {
  const { t } = useTranslation();
  const [dbName, setDbName] = useState('');
  const [fields, setFields] = useState([{ name: '', type: 'text' }]);
  const [created, setCreated] = useState(false);

  const addField = () => {
    setFields([...fields, { name: '', type: 'text' }]);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleFieldChange = (index: number, key: string, value: string) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [key]: value };
    setFields(newFields);
  };

  const createDatabase = () => {
    const schema: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.name) {
        schema[field.name] = field.type;
      }
    });
    
    if (Object.keys(schema).length > 0 && dbName) {
      DatabaseEngine.getInstance().createDatabase(dbName, schema);
      setCreated(true);
    }
  };

  if (created) {
    return (
      <div className="p-4 bg-green-50 text-green-700 rounded-lg">
        <h3 className="font-bold">{t('database.createdTitle')}</h3>
        <p>{t('database.createdMessage', { name: dbName })}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">{t('database.creatorTitle')}</h2>
      
      <div className="mb-4">
        <label className="block mb-2">{t('database.dbName')}</label>
        <input
          type="text"
          value={dbName}
          onChange={(e) => setDbName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder={t('database.dbNamePlaceholder')}
        />
      </div>
      
      <h3 className="font-bold mb-2">{t('database.fieldsTitle')}</h3>
      
      {fields.map((field, index) => (
        <div key={index} className="flex mb-2 space-x-2">
          <input
            type="text"
            value={field.name}
            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder={t('database.fieldNamePlaceholder')}
          />
          
          <select
            value={field.type}
            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
            className="p-2 border rounded"
          >
            <option value="text">{t('database.text')}</option>
            <option value="number">{t('database.number')}</option>
            <option value="date">{t('database.date')}</option>
            <option value="checkbox">{t('database.checkbox')}</option>
            <option value="select">{t('database.select')}</option>
          </select>
          
          <button
            onClick={() => removeField(index)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t('database.remove')}
          </button>
        </div>
      ))}
      
      <div className="flex space-x-2 mt-4">
        <button
          onClick={addField}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('database.addField')}
        </button>
        
        <button
          onClick={createDatabase}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!dbName || fields.some(f => !f.name)}
        >
          {t('database.create')}
        </button>
      </div>
    </div>
  );
};

export default DatabaseCreator;
import React, { useState } from 'react';
import { FileText, Users, Calendar, Clock, AlertCircle, Check, X, FileCheck, ArrowRight, Database, BarChart2, Clipboard, Settings, Bell, Search, Filter, Download, ChevronDown, BookOpen, PlusCircle, Edit, Trash2, Eye, Printer, Mail, Phone, Lock, ShieldCheck, Key } from 'lucide-react';

const CourtAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('filings');
  const [selectedFiling, setSelectedFiling] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New filing requires review', time: '10 minutes ago' },
    { id: 2, text: 'Hearing scheduled for Johnson case', time: '1 hour ago' },
    { id: 3, text: 'Document processing complete', time: '2 hours ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  
  // Mock data for recent filings
  const [recentFilings, setRecentFilings] = useState([
    { 
      id: 'F-2025-1038', 
      title: 'Johnson v. State of California', 
      type: 'Civil Complaint',
      filed: '02/24/2025',
      county: 'Los Angeles',
      processingStatus: 'Complete',
      accuracy: 96,
      priority: 'High'
    },
    { 
      id: 'F-2025-1037', 
      title: 'Martinez Child Custody Petition', 
      type: 'Family Law',
      filed: '02/24/2025',
      county: 'Orange',
      processingStatus: 'Complete',
      accuracy: 93,
      priority: 'Medium'
    },
    { 
      id: 'F-2025-1036', 
      title: 'Smith Small Claims', 
      type: 'Small Claims',
      filed: '02/23/2025',
      county: 'San Diego',
      processingStatus: 'Error',
      accuracy: 78,
      priority: 'Low'
    },
    { 
      id: 'F-2025-1035', 
      title: 'Estate of Wilson', 
      type: 'Probate',
      filed: '02/23/2025',
      county: 'San Francisco',
      processingStatus: 'Complete',
      accuracy: 98,
      priority: 'Medium'
    }
  ]);
  
  // Mock data for calendar
  const [scheduledHearings, setScheduledHearings] = useState([
    {
      id: 'H-2025-089',
      title: 'Peterson v. City of Sacramento',
      date: '02/26/2025',
      time: '9:00 AM',
      room: 'Courtroom 3B',
      judge: 'Hon. Maria Vasquez',
      type: 'Status Conference',
      participants: 4
    },
    {
      id: 'H-2025-090',
      title: 'In Re: Thompson Estate',
      date: '02/26/2025',
      time: '10:30 AM',
      room: 'Courtroom 5A',
      judge: 'Hon. David Chen',
      type: 'Petition Hearing',
      participants: 6
    },
    {
      id: 'H-2025-091',
      title: 'Garcia Dissolution',
      date: '02/26/2025',
      time: '1:15 PM',
      room: 'Courtroom 2C',
      judge: 'Hon. Sarah Williams',
      type: 'Mediation',
      participants: 3
    }
  ]);
  
  const [showScheduleHearingModal, setShowScheduleHearingModal] = useState(false);
  const [newHearing, setNewHearing] = useState({
    title: '',
    date: '',
    time: '',
    room: '',
    judge: '',
    type: '',
    participants: 0
  });

  // Mock data for system integrations
  const systemIntegrations = [
    { name: 'California Courts Case Management System', status: 'Connected', lastSync: '10 minutes ago' },
    { name: 'Google Workspace', status: 'Connected', lastSync: '2 hours ago' },
    { name: 'County Records Database', status: 'Connected', lastSync: '1 hour ago' },
    { name: 'State Bar Directory', status: 'Connected', lastSync: '6 hours ago' }
  ];

  // Mock data for document fields and accuracy
  const documentFields = [
    { field: 'Case Type', extracted: 'Civil - Personal Injury', confidence: 98, status: 'Verified' },
    { field: 'Plaintiff Name', extracted: 'Michael Johnson', confidence: 99, status: 'Verified' },
    { field: 'Defendant Name', extracted: 'State of California', confidence: 99, status: 'Verified' },
    { field: 'Filing Date', extracted: '02/24/2025', confidence: 100, status: 'Verified' },
    { field: 'Claimed Damages', extracted: '$2,500,000', confidence: 97, status: 'Verified' }
  ];
  
  // Attorneys roster data
  const [attorneys, setAttorneys] = useState([
    { id: 1, name: 'Maria Rodriguez', barNumber: 'CA123456', status: 'Active', type: 'Public Defender', cases: 12 },
    { id: 2, name: 'David Kim', barNumber: 'CA234567', status: 'Active', type: 'Mediator', cases: 8 },
    { id: 3, name: 'Sarah Johnson', barNumber: 'CA345678', status: 'Inactive', type: 'Public Defender', cases: 0 },
    { id: 4, name: 'Michael Chen', barNumber: 'CA456789', status: 'Active', type: 'Mediator', cases: 15 }
  ]);
  
  // Legal Research categories
  const researchCategories = [
    { name: 'Case Law', count: 1205 },
    { name: 'Statutes', count: 450 },
    { name: 'Regulations', count: 320 },
    { name: 'Local Rules', count: 98 },
    { name: 'Forms', count: 75 }
  ];
  
  // Recent searches
  const recentSearches = [
    'California civil procedure summary judgment',
    'Family law child custody standards',
    'Probate court filing requirements',
    'Small claims damages limitation'
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredFilings = recentFilings.filter(filing => {
    const matchesSearch = filing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          filing.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          filing.county.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' ? true : filing.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });
  
  const handleAddNewFiling = () => {
    const newFiling = {
      id: `F-2025-${1039 + recentFilings.length}`,
      title: 'New Demo Filing',
      type: 'Small Claims',
      filed: '02/25/2025',
      county: 'Alameda',
      processingStatus: 'Processing',
      accuracy: 0,
      priority: 'Medium'
    };
    
    setRecentFilings([newFiling, ...recentFilings]);
    setSelectedFiling(newFiling);
  };
  
  const handleDeleteFiling = (filingId) => {
    setRecentFilings(recentFilings.filter(filing => filing.id !== filingId));
    if (selectedFiling && selectedFiling.id === filingId) {
      setSelectedFiling(null);
    }
  };
  
  const handleProcessFiling = () => {
    if (!selectedFiling) return;
    
    const updatedFilings = recentFilings.map(filing => {
      if (filing.id === selectedFiling.id) {
        return {
          ...filing,
          processingStatus: 'Complete',
          accuracy: Math.floor(Math.random() * 15) + 85 // Random accuracy between 85-99
        };
      }
      return filing;
    });
    
    setRecentFilings(updatedFilings);
    setSelectedFiling({
      ...selectedFiling,
      processingStatus: 'Complete',
      accuracy: Math.floor(Math.random() * 15) + 85
    });
  };
  
  const handleAddHearing = (e) => {
    e.preventDefault();
    const newHearingObj = {
      id: `H-2025-${92 + scheduledHearings.length}`,
      ...newHearing
    };
    
    setScheduledHearings([...scheduledHearings, newHearingObj]);
    setShowScheduleHearingModal(false);
    setNewHearing({
      title: '',
      date: '',
      time: '',
      room: '',
      judge: '',
      type: '',
      participants: 0
    });
  };
  
  const handleHearingInputChange = (e) => {
    const { name, value } = e.target;
    setNewHearing({
      ...newHearing,
      [name]: value
    });
  };

  const renderFilingDetails = () => {
    if (!selectedFiling) {
      return (
        <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">Select a filing to view details</p>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{selectedFiling.title}</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-3">Filing #{selectedFiling.id}</span>
            <button 
              className="flex items-center bg-blue-800 text-yellow-400 px-4 py-2 rounded"
              onClick={handleProcessFiling}
              disabled={selectedFiling.processingStatus === 'Complete'}
            >
              <Clock size={18} className="mr-2" />
              Process Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{selectedFiling.type}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Filed Date</p>
            <p className="font-medium">{selectedFiling.filed}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">County</p>
            <p className="font-medium">{selectedFiling.county}</p>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-sm text-gray-500 mb-2">DOCUMENT PROCESSING</h4>
            <div className="flex items-center mb-2">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                <FileText size={32} className="text-gray-400" />
              </div>
              <div>
                <p className="font-medium">{selectedFiling.title}.pdf</p>
                <p className="text-sm text-gray-500">Uploaded on {selectedFiling.filed}</p>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                    selectedFiling.processingStatus === 'Complete' ? 'bg-green-100 text-green-800' :
                    selectedFiling.processingStatus === 'Error' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedFiling.processingStatus}
                  </span>
                  {selectedFiling.processingStatus === 'Complete' && (
                    <span className="text-sm">
                      Accuracy: <span className={`font-medium ${
                        selectedFiling.accuracy > 90 ? 'text-green-600' :
                        selectedFiling.accuracy > 80 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{selectedFiling.accuracy}%</span>
                    </span>
                  )}
                  {selectedFiling.processingStatus === 'Processing' && (
                    <span className="text-sm flex items-center">
                      <Clock size={14} className="mr-1 text-blue-600 animate-pulse" />
                      Processing...
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {selectedFiling.processingStatus === 'Complete' && (
              <div className="mt-4">
                <h5 className="font-bold text-sm text-gray-500 mb-2">EXTRACTED FIELDS</h5>
                <div className="space-y-2">
                  {documentFields.map((field, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <span className="text-sm font-medium">{field.field}:</span>
                        <span className="text-sm ml-2">{field.extracted}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs font-medium ${
                          field.confidence > 90 ? 'text-green-600' :
                          field.confidence > 80 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {field.confidence}%
                        </span>
                        <Check size={14} className="ml-1 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-3 mt-auto">
          <button 
            className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded"
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={16} />
            <span>Schedule Hearing</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded">
            <Printer size={16} />
            <span>Print</span>
          </button>
          <button 
            className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded ml-auto"
            onClick={() => handleDeleteFiling(selectedFiling.id)}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-yellow-400 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-yellow-400"></div>
          <h1 className="text-xl font-bold">COURTNEY SESSIONS</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search filings, hearings..." 
              className="bg-blue-900 text-white rounded-md px-4 py-2 pl-10 w-64"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <Bell 
              className="h-5 w-5 cursor-pointer" 
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {notifications.length}
            </span>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                <div className="p-2 border-b border-gray-200">
                  <h3 className="font-bold text-gray-700">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <button 
                    className="text-sm text-[#1a4699] font-medium hover:underline"
                    onClick={() => setNotifications([])}
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-blue-800 font-bold">
            CA
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white p-6">
          <div className="space-y-6">
            <div 
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${activeTab === 'filings' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-blue-900'}`}
              onClick={() => setActiveTab('filings')}
            >
              <FileText className="h-5 w-5" />
              <span>Filings</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${activeTab === 'calendar' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-blue-900'}`}
              onClick={() => setActiveTab('calendar')}
            >
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${activeTab === 'attorneys' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-blue-900'}`}
              onClick={() => setActiveTab('attorneys')}
            >
              <Users className="h-5 w-5" />
              <span>Attorneys</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${activeTab === 'research' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-blue-900'}`}
              onClick={() => setActiveTab('research')}
            >
              <BookOpen className="h-5 w-5" />
              <span>Legal Research</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${activeTab === 'reports' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-blue-900'}`}
              onClick={() => setActiveTab('reports')}
            >
              <BarChart2 className="h-5 w-5" />
              <span>Reports</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${activeTab === 'integrations' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-blue-900'}`}
              onClick={() => setActiveTab('integrations')}
            >
              <Database className="h-5 w-5" />
              <span>Integrations</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${activeTab === 'settings' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-blue-900'}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
          </div>
          
          <div className="mt-12 p-4 bg-blue-900 rounded-lg">
            <h3 className="text-yellow-400 font-bold mb-2">UNIFY COURT DATA</h3>
            <p className="text-sm text-gray-300 mb-3">Streamline judicial workflows and eliminate document processing fragmentation.</p>
            <button className="bg-yellow-400 text-blue-800 text-sm font-bold py-2 px-4 rounded w-full">
              AUTOMATION CENTER
            </button>
          </div>
        </aside>

        {/* Main dashboard area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'filings' && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Court Filing Management</h2>
                <p className="text-gray-600">Tuesday, February 25, 2025</p>
              </div>

              {/* Dashboard stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-gray-500 text-sm mb-1">New Filings Today</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">8</span>
                    <span className="text-green-500 text-sm">+3 from yesterday</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-gray-500 text-sm mb-1">Processing Queue</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">3</span>
                    <span className="text-green-500 text-sm">All on schedule</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-gray-500 text-sm mb-1">Review Required</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">5</span>
                    <span className="text-red-500 text-sm">2 urgent</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-gray-500 text-sm mb-1">Average Accuracy</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">94.5%</span>
                    <span className="text-green-500 text-sm">+2.1% this week</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 space-x-6 overflow-hidden">
                {/* Filings list */}
                <div className="w-2/5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Recent Filings</h2>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <select
                          className="p-1.5 rounded bg-gray-200 hover:bg-gray-300 appearance-none pl-8 pr-6"
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                        >
                          <option value="all">All</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <Filter size={16} className="absolute left-2 top-2" />
                      </div>
                      <button 
                        className="flex items-center space-x-1 bg-blue-800 text-yellow-400 px-3 py-1.5 rounded text-sm font-medium"
                        onClick={handleAddNewFiling}
                      >
                        <PlusCircle size={14} />
                        <span>New Filing</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                    {filteredFilings.map(filing => (
                      <div 
                        key={filing.id} 
                        className={`p-4 bg-white border rounded-lg cursor-pointer hover:border-yellow-400 ${selectedFiling && selectedFiling.id === filing.id ? 'border-yellow-400 ring-1 ring-yellow-400' : 'border-gray-200'}`}
                        onClick={() => setSelectedFiling(filing)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{filing.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            filing.priority === 'High' ? 'bg-red-100 text-red-800' :
                            filing.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {filing.priority}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{filing.type}</span>
                          <span>{filing.filed}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-500">#{filing.id} • {filing.county} County</span>
                          <span className={`flex items-center text-xs font-medium ${
                            filing.processingStatus === 'Complete' ? 'text-green-600' :
                            filing.processingStatus === 'Error' ? 'text-red-600' :
                            'text-blue-600'
                          }`}>
                            {filing.processingStatus === 'Complete' ? <Check size={14} className="mr-1" /> :
                             filing.processingStatus === 'Error' ? <AlertCircle size={14} className="mr-1" /> :
                             <Clock size={14} className="mr-1 animate-pulse" />}
                            {filing.processingStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {filteredFilings.length === 0 && (
                      <div className="p-4 text-center bg-white border rounded-lg">
                        <p className="text-gray-500">No filings match your search</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Filing details */}
                <div className="w-3/5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Filing Details</h2>
                    {selectedFiling && (
                      <div className="flex space-x-2">
                        <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                          <Download size={16} />
                        </button>
                        <button 
                          className="flex items-center space-x-1 bg-[#1a4699] text-[#ffd900] px-3 py-1.5 rounded text-sm font-medium"
                          onClick={handleProcessFiling}
                          disabled={selectedFiling.processingStatus === 'Complete'}
                        >
                          <span>Process Now</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {renderFilingDetails()}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Court Calendar</h2>
                <p className="text-gray-600">Tuesday, February 25, 2025</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">Upcoming Hearings</h3>
                    <button 
                      className="flex items-center text-sm text-[#1a4699] hover:text-[#15387d]"
                      onClick={() => setShowScheduleHearingModal(true)}
                    >
                      <PlusCircle size={16} className="mr-1" />
                      Schedule New
                    </button>
                  </div>
                  <div className="space-y-3">
                    {scheduledHearings.map(hearing => (
                      <div key={hearing.id} className="flex p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-lg flex flex-col items-center justify-center mr-3 font-medium">
                          <span className="text-xs">Feb</span>
                          <span>{hearing.date.split('/')[1]}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{hearing.title}</h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{hearing.time} • {hearing.room}</span>
                            <span className="text-blue-600">{hearing.type}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 py-2 text-sm bg-blue-800 text-yellow-400 rounded-lg">View All Hearings</button>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Judge Availability</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Hon. Maria Vasquez</span>
                      <span className="text-green-600">Available</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Hon. David Chen</span>
                      <span className="text-green-600">Available</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Hon. Sarah Williams</span>
                      <span className="text-red-600">Unavailable until 3/1</span>
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <span className="font-medium">Hon. Robert Johnson</span>
                      <span className="text-gray-600">Out of Office</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 text-sm bg-blue-800 text-yellow-400 rounded-lg">View Court Schedule</button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold mb-4">Monthly Calendar</h3>
                <div className="grid grid-cols-7 gap-1">
                  {/* Calendar header */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center p-2 font-medium text-gray-500">{day}</div>
                  ))}
                  
                  {/* Calendar days */}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 3; // Starting from previous month
                    const isCurrentMonth = day > 0 && day <= 28;
                    const isToday = day === 25; // Today is 25th
                    const hasEvents = [5, 12, 19, 26].includes(day);
                    
                    return (
                      <div 
                        key={i} 
                        className={`p-2 h-20 border ${
                          isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
                        } ${isToday ? 'border-[#1a4699] border-2' : 'border-gray-200'}`}
                      >
                        <p className={`text-right ${isToday ? 'font-bold text-[#1a4699]' : ''}`}>
                          {day > 0 ? day : 31 + day}
                        </p>
                        
                        {hasEvents && isCurrentMonth && (
                          <div className="mt-1 text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                            Hearing
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attorneys' && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Attorney Roster</h2>
                <p className="text-gray-600">Tuesday, February 25, 2025</p>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="font-bold">Registered Attorneys</h3>
                  <button className="flex items-center text-sm text-[#1a4699] hover:text-[#15387d]">
                    <PlusCircle size={16} className="mr-1" />
                    Add Attorney
                  </button>
                </div>
                
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bar Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Cases</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attorneys.map(attorney => (
                      <tr key={attorney.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-[#1a4699] text-white flex items-center justify-center">
                              {attorney.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{attorney.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">{attorney.barNumber}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            attorney.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {attorney.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">{attorney.type}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm">{attorney.cases}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="text-blue-800 hover:text-blue-600 mr-3">
                            <Eye size={16} />
                          </button>
                          <button className="text-blue-800 hover:text-blue-600 mr-3">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Attorney Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-800 text-white rounded-lg text-center">
                      <p className="text-lg font-bold">{attorneys.length}</p>
                      <p className="text-sm">Total Attorneys</p>
                    </div>
                    <div className="p-3 bg-blue-800 text-white rounded-lg text-center">
                      <p className="text-lg font-bold">
                        {attorneys.filter(a => a.status === 'Active').length}
                      </p>
                      <p className="text-sm">Active Attorneys</p>
                    </div>
                    <div className="p-3 bg-blue-800 text-white rounded-lg text-center">
                      <p className="text-lg font-bold">
                        {attorneys.filter(a => a.type === 'Public Defender').length}
                      </p>
                      <p className="text-sm">Public Defenders</p>
                    </div>
                    <div className="p-3 bg-blue-800 text-white rounded-lg text-center">
                      <p className="text-lg font-bold">
                        {attorneys.filter(a => a.type === 'Mediator').length}
                      </p>
                      <p className="text-sm">Mediators</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Case Assignment</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Assign cases to attorneys to manage caseload distribution.
                  </p>
                  <button className="w-full py-2 bg-[#1a4699] text-white rounded font-medium">
                    Assign New Case
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'research' && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Legal Research</h2>
                <p className="text-gray-600">Tuesday, February 25, 2025</p>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search legal database..." 
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button className="absolute right-3 top-2 px-3 py-1.5 bg-[#1a4699] text-white rounded">
                    Search
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Research Categories</h3>
                  <div className="space-y-2">
                    {researchCategories.map((category, index) => (
                      <div key={index} className="flex justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <span>{category.name}</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Recent Searches</h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <Clock size={14} className="text-gray-400 mr-2" />
                        <span className="text-sm">{search}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Research Tools</h3>
                  <div className="space-y-3">
                    <button className="w-full p-2 bg-gray-100 text-[#1a4699] rounded flex items-center justify-center">
                      <BookOpen size={16} className="mr-2" />
                      Case Law Database
                    </button>
                    <button className="w-full p-2 bg-gray-100 text-[#1a4699] rounded flex items-center justify-center">
                      <FileText size={16} className="mr-2" />
                      Document Templates
                    </button>
                    <button className="w-full p-2 bg-gray-100 text-[#1a4699] rounded flex items-center justify-center">
                      <Users size={16} className="mr-2" />
                      Expert Directory
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold mb-3">Featured Resources</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-blue-800">California Civil Procedure Update</h4>
                    <p className="text-sm text-gray-500 mt-1">Updated guidelines for civil procedure in California courts.</p>
                    <button className="mt-3 text-sm font-medium text-blue-800">View Resource</button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-[#1a4699]">Family Law Forms Guide</h4>
                    <p className="text-sm text-gray-500 mt-1">Comprehensive guide to family law forms and requirements.</p>
                    <button className="mt-3 text-sm font-medium text-[#1a4699]">View Resource</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">System Integrations</h2>
                <p className="text-gray-600">Tuesday, February 25, 2025</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-4">Connected Systems</h3>
                  <div className="space-y-3">
                    {systemIntegrations.map((system, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg flex items-center justify-center mr-3 bg-green-100 text-green-600">
                            <Database size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium">{system.name}</h4>
                            <p className="text-xs text-gray-500">Last sync: {system.lastSync}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-3 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {system.status}
                          </span>
                          <button className="text-[#1a4699] text-sm font-medium">Manage</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-4">Add New Integration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border rounded-lg flex flex-col items-center hover:bg-gray-50">
                      <img src="/api/placeholder/48/48" alt="Google Workspace" className="mb-2" />
                      <h4 className="font-medium text-center">Google Workspace</h4>
                      <p className="text-xs text-gray-500 text-center mt-1">Calendar, Docs, Drive</p>
                    </button>
                    <button className="p-4 border rounded-lg flex flex-col items-center hover:bg-gray-50">
                      <img src="/api/placeholder/48/48" alt="Microsoft 365" className="mb-2" />
                      <h4 className="font-medium text-center">Microsoft 365</h4>
                      <p className="text-xs text-gray-500 text-center mt-1">Outlook, OneDrive, Teams</p>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold mb-4">Integration Status</h3>
                <div className="h-48 w-full border rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Integration status dashboard will be displayed here.</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Reports & Analytics</h2>
                <p className="text-gray-600">Tuesday, February 25, 2025</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Filing Statistics</h3>
                  <div className="h-48 w-full border rounded-lg flex items-center justify-center">
                    <BarChart2 size={48} className="text-blue-800" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="p-2 bg-gray-100 rounded text-center">
                      <p className="text-sm text-gray-500">Total Filings</p>
                      <p className="font-bold text-lg">256</p>
                    </div>
                    <div className="p-2 bg-gray-100 rounded text-center">
                      <p className="text-sm text-gray-500">Approved</p>
                      <p className="font-bold text-lg">204</p>
                    </div>
                    <div className="p-2 bg-gray-100 rounded text-center">
                      <p className="text-sm text-gray-500">Rejected</p>
                      <p className="font-bold text-lg">52</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Case Types</h3>
                  <div className="h-48 w-full border rounded-lg flex items-center justify-center">
                    <BarChart2 size={48} className="text-blue-800" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    <div className="p-2 flex items-center">
                      <div className="h-3 w-3 bg-[#1a4699] rounded-full mr-2"></div>
                      <span className="text-xs">Civil</span>
                    </div>
                    <div className="p-2 flex items-center">
                      <div className="h-3 w-3 bg-[#ffd900] rounded-full mr-2"></div>
                      <span className="text-xs">Family</span>
                    </div>
                    <div className="p-2 flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs">Probate</span>
                    </div>
                    <div className="p-2 flex items-center">
                      <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-xs">Criminal</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold">Generated Reports</h3>
                  <button className="text-sm text-[#1a4699] font-medium">Generate New</button>
                </div>
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <p className="font-medium">Monthly Filing Summary</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm">Feb 1, 2025</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">PDF</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-[#1a4699] hover:text-[#15387d] mr-3">
                          <Eye size={16} />
                        </button>
                        <button className="text-[#1a4699] hover:text-[#15387d]">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <p className="font-medium">Case Processing Times</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm">Jan 15, 2025</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Excel</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-[#1a4699] hover:text-[#15387d] mr-3">
                          <Eye size={16} />
                        </button>
                        <button className="text-[#1a4699] hover:text-[#15387d]">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">System Settings</h2>
                <p className="text-gray-600">Tuesday, February 25, 2025</p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">User Profile</h3>
                  <div className="flex flex-col items-center p-4">
                    <div className="h-20 w-20 rounded-full bg-yellow-400 text-blue-800 flex items-center justify-center text-xl font-bold mb-3">
                      CA
                    </div>
                    <h4 className="font-medium">Court Administrator</h4>
                    <p className="text-sm text-gray-500">admin@courtsystem.gov</p>
                    <button className="mt-4 text-sm text-blue-800 font-medium">Edit Profile</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Notification Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-800 mr-2" />
                        <span>Email Notifications</span>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-800">
                        <span className="absolute h-4 w-4 transform rounded-full bg-white transition left-[2px]"></span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-blue-800 mr-2" />
                        <span>SMS Alerts</span>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                        <span className="absolute h-4 w-4 transform rounded-full bg-white transition left-[2px]"></span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-blue-800 mr-2" />
                        <span>In-App Notifications</span>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-800">
                        <span className="absolute h-4 w-4 transform rounded-full bg-white transition left-[2px]"></span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-bold mb-3">Security Settings</h3>
                  <div className="space-y-3">
                    <button className="w-full p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-blue-800 rounded">
                      <Lock size={16} className="mr-2" />
                      <span>Change Password</span>
                    </button>
                    <button className="w-full p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-blue-800 rounded">
                      <ShieldCheck size={16} className="mr-2" />
                      <span>Enable 2FA</span>
                    </button>
                    <button className="w-full p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-blue-800 rounded">
                      <Key size={16} className="mr-2" />
                      <span>Manage API Keys</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold mb-3">System Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Court</label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option>California Superior Court</option>
                      <option>Federal District Court</option>
                      <option>California Appellate Court</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option>Blue & Yellow</option>
                      <option>Dark Mode</option>
                      <option>Light Mode</option>
                    </select>
                  </div>
                </div>
                                  <button className="mt-4 px-4 py-2 bg-blue-800 text-white rounded">Save Preferences</button>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Schedule Hearing Modal */}
      {showScheduleHearingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowScheduleHearingModal(false)}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md z-10 relative">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">Schedule New Hearing</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowScheduleHearingModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddHearing} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={newHearing.title}
                  onChange={handleHearingInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="text" 
                    name="date"
                    value={newHearing.date}
                    onChange={handleHearingInputChange}
                    placeholder="MM/DD/YYYY"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="text" 
                    name="time"
                    value={newHearing.time}
                    onChange={handleHearingInputChange}
                    placeholder="HH:MM AM/PM"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Courtroom</label>
                  <input 
                    type="text" 
                    name="room"
                    value={newHearing.room}
                    onChange={handleHearingInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judge</label>
                  <input 
                    type="text" 
                    name="judge"
                    value={newHearing.judge}
                    onChange={handleHearingInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    name="type"
                    value={newHearing.type}
                    onChange={handleHearingInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="Status Conference">Status Conference</option>
                    <option value="Petition Hearing">Petition Hearing</option>
                    <option value="Mediation">Mediation</option>
                    <option value="Trial">Trial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                  <input 
                    type="number" 
                    name="participants"
                    value={newHearing.participants}
                    onChange={handleHearingInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    min="1"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                  onClick={() => setShowScheduleHearingModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-800 text-white rounded"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourtAdminDashboard;

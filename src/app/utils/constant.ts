export class Constant {

  static SORT_BY_LIST = [
    { name: 'Date Created', value: 'Date Created' },
    // { name: 'Date Closed', value: 'Date Closed' },
  ];

  static STATUS = [
    { name: 'New', value: 'New' },
    { name: 'Open', value: 'Open' },
    { name: 'In Progress', value: 'In Progress' },
    { name: 'Need Discussion', value: 'Need Discussion' },
    { name: 'Awaiting User Feedback', value: 'Awaiting User Feedback' },
    { name: 'Closed', value: 'Closed' },
    { name: 'Re-Open', value: 'Re-Open' },
    { name: 'On hold', value: 'On hold' },
  ];

  static ROLE_LIST = [
    { name: 'PME', value: 'PME' },
    { name: 'User', value: 'User' },
    { name: 'L1 Team', value: 'L1 Team' },
    { name: 'L2 Team', value: 'L2 Team' },
  ];

  static PRIORITY_LIST = [
    { name: 'High', value: 'High' },
    { name: 'Lower', value: 'Lower' },
    { name: 'Critical', value: 'Critical' },
    { name: 'Medium', value: 'Medium' },
  ];

  static CLASSIFICATION_LIST = [
    { name: 'Queries', value: 'Queries' },
    { name: 'Problem', value: 'Problem' },
    { name: 'Service Request', value: 'Service Request' },
    { name: 'Enhancements', value: 'Enhancements' },
  ];

  static CATEGORY_LIST = [
    { name: 'General', value: 'General' },
    { name: 'Organization', value: 'Organization' },
    { name: 'Users', value: 'Users' },
    { name: 'Integrations', value: 'Integrations' },
    { name: 'Notifications', value: 'Notifications' },
    { name: 'Issues', value: 'Issues' },
    { name: 'Cx Portal', value: 'Cx Portal' },
    { name: 'Document Manager', value: 'Document Manager' },
    { name: 'Checklist', value: 'Checklist' },
    { name: 'FATs', value: 'FATs' },
    { name: 'Reports', value: 'Reports' },
    { name: 'Dashboard', value: 'Dashboard' },
    { name: 'SSM', value: 'SSM' },
  ];

  static  BUGTYPE_LIST = [
    { name: 'Existing Product Bug', value: 'Existing Product Bug' },
    { name: 'Triggered by Enhancements', value: 'Triggered by Enhancements' },
    { name: 'Triggered by a Recent Fix', value: 'Triggered by a Recent Fix' }
  ];
}

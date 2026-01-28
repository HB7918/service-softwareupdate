import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import Alert from '@cloudscape-design/components/alert';
import Container from '@cloudscape-design/components/container';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import Tabs from '@cloudscape-design/components/tabs';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import Flashbar from '@cloudscape-design/components/flashbar';
import Modal from '@cloudscape-design/components/modal';
import RadioGroup from '@cloudscape-design/components/radio-group';
import Select from '@cloudscape-design/components/select';
import FormField from '@cloudscape-design/components/form-field';
import Popover from '@cloudscape-design/components/popover';
import DatePicker from '@cloudscape-design/components/date-picker';
import TimeInput from '@cloudscape-design/components/time-input';

function DomainPageHeader() {
  const handleActionsClick = ({ detail }) => {
    console.log('Action clicked:', detail.id);
  };

  return (
    <Header
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button onClick={() => console.log('Delete clicked')}>Delete</Button>
          <ButtonDropdown
            items={[
              { id: 'edit', text: 'Edit' },
              { id: 'upgrade', text: 'Upgrade' }
            ]}
            onItemClick={handleActionsClick}
          >
            Actions
          </ButtonDropdown>
        </SpaceBetween>
      }
      variant="h1"
    >
      my-domain-1
    </Header>
  );
}

function SemanticEnrichmentAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert
      action={
        <Button onClick={() => console.log('Create index from alert clicked')}>
          Create index
        </Button>
      }
      dismissible
      onDismiss={() => setVisible(false)}
      header="Automatic semantic enrichment"
      type="info"
    >
      To improve search relevance, create an index with semantic fields. OpenSearch will
      automatically generate vector embeddings to capture the semantic meaning of your text data.
    </Alert>
  );
}

function ServiceSoftwareUpdateModal({ visible, onDismiss, onConfirm }) {
  const [updateOption, setUpdateOption] = useState('apply-now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleConfirm = () => {
    console.log('Service software update confirmed:', updateOption, scheduleDate, scheduleTime);
    onConfirm(updateOption, scheduleDate, scheduleTime);
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      header="Service software update available"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDismiss}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Box>
          Update service software OpenSearch_1_3_R20251106-P1 is available for this domain. Software updates use blue/green deployments to minimize downtime. We recommend performing updates during off-peak window.
        </Box>
        <RadioGroup
          value={updateOption}
          onChange={({ detail }) => setUpdateOption(detail.value)}
          items={[
            {
              value: 'apply-now',
              label: 'Apply update now'
            },
            {
              value: 'schedule',
              label: 'Schedule for specific date and time'
            }
          ]}
        />
        {updateOption === 'schedule' && (
          <SpaceBetween size="m">
            <FormField label="Date">
              <DatePicker
                value={scheduleDate}
                onChange={({ detail }) => setScheduleDate(detail.value)}
                placeholder="YYYY/MM/DD"
                invalid={updateOption === 'schedule' && !scheduleDate}
              />
            </FormField>
            <FormField label="Start time (UTC)">
              <div style={{ width: '194px' }}>
                <TimeInput
                  value={scheduleTime}
                  onChange={({ detail }) => setScheduleTime(detail.value)}
                  placeholder="hh:mm"
                  format="hh:mm"
                  invalid={updateOption === 'schedule' && !scheduleTime}
                />
              </div>
            </FormField>
          </SpaceBetween>
        )}
        <Alert type="info">
          We strongly recommend defining an off-peak window for your domain. This will allow you to schedule updates during low traffic times.{' '}
          <Link external href="#">Learn more</Link>
        </Alert>
      </SpaceBetween>
    </Modal>
  );
}

function GeneralInformationContainer({ onOpenUpdateModal, updateScheduled, scheduledDateTime, onReschedule, preCheckFailed }) {
  return (
    <Container header={<Header variant="h2">General information</Header>}>
      <KeyValuePairs
        columns={4}
        items={[
          {
            type: 'group',
            items: [
              { label: 'Name', value: 'hari-d2' },
              {
                label: 'Domain ARN',
                value: (
                  <CopyToClipboard
                    copyErrorText="ARN failed to copy"
                    copySuccessText="ARN copied"
                    textToCopy="arn:aws:es:us-east-1:478031150931:domain/hari-d2"
                    variant="inline"
                  />
                )
              }
            ]
          },
          {
            type: 'group',
            items: [
              {
                label: (
                  <span>
                    Domain processing status{' '}
                    <Link variant="info">Info</Link>
                  </span>
                ),
                value: <StatusIndicator type="success">Active</StatusIndicator>
              },
              {
                label: (
                  <span>
                    Configuration change status{' '}
                    <Link variant="info">Info</Link>
                  </span>
                ),
                value: (
                  <Popover
                    dismissButton={true}
                    content={
                      <SpaceBetween size="s">
                        <span>
                          The requested changes have been made successfully on Sun, 29 Jun 2025 01:29:40 UTC and the domain is now Active.
                        </span>
                        <div>
                          <Box variant="awsui-key-label">Change ID</Box>
                          <CopyToClipboard
                            copyErrorText="Change ID failed to copy"
                            copySuccessText="Change ID copied"
                            textToCopy="7fcc77fa-3d02-4813-8542-339169d84ebc"
                            variant="inline"
                          />
                        </div>
                      </SpaceBetween>
                    }
                    triggerType="text"
                  >
                    <StatusIndicator type="success">Completed</StatusIndicator>
                  </Popover>
                )
              },
              {
                label: (
                  <span>
                    Cluster health{' '}
                    <Link variant="info">Info</Link>
                  </span>
                ),
                value: 'Green'
              }
            ]
          },
          {
            type: 'group',
            items: [
              {
                label: (
                  <span>
                    Version{' '}
                    <Link variant="info">Info</Link>
                  </span>
                ),
                value: (
                  <SpaceBetween size="xxs">
                    <span>OpenSearch 1.3</span>
                    <Link variant="primary">Upgrade available</Link>
                  </SpaceBetween>
                )
              },
              {
                label: (
                  <span>
                    Service software version{' '}
                    <Link variant="info">Info</Link>
                  </span>
                ),
                value: preCheckFailed ? (
                  <SpaceBetween size="xxs">
                    <span>OpenSearch_2_17_R20250403</span>
                    <Popover
                      dismissButton={true}
                      content={
                        <SpaceBetween size="m">
                          <span>
                            Service software update OpenSearch_2_11_R20251106-P1 cannot be installed due to failure of pre-validation checks.
                          </span>
                          <KeyValuePairs
                            columns={1}
                            items={[
                              { label: 'Last attempted', value: 'Wed, 28 Jan 2026 20:01:04' },
                              { label: 'Reason', value: 'Error message, reason' },
                              { label: 'Target software version', value: 'R20231016' }
                            ]}
                          />
                        </SpaceBetween>
                      }
                      triggerType="text"
                    >
                      <StatusIndicator type="error">Pre check failed</StatusIndicator>
                    </Popover>
                    <Link variant="primary" onFollow={(e) => { e.preventDefault(); onOpenUpdateModal(); }}>Update available</Link>
                  </SpaceBetween>
                ) : updateScheduled ? (
                  <SpaceBetween size="xxs">
                    <span>OpenSearch_2_17_R20250403</span>
                    <Popover
                      dismissButton={true}
                      content={
                        <span>
                          Update scheduled to start at {scheduledDateTime} UTC. If you request a configuration change and it overlaps with the scheduled service software update, the service software update will be postponed for three days.
                        </span>
                      }
                      triggerType="text"
                    >
                      <StatusIndicator type="in-progress">Update scheduled</StatusIndicator>
                    </Popover>
                    <Link variant="primary" onFollow={(e) => { e.preventDefault(); onReschedule(); }}>Reschedule</Link>
                  </SpaceBetween>
                ) : (
                  <SpaceBetween size="xxs">
                    <span>OpenSearch_1_3_R20250625</span>
                    <Link variant="primary" onFollow={(e) => { e.preventDefault(); onOpenUpdateModal(); }}>Update available</Link>
                  </SpaceBetween>
                )
              }
            ]
          },
          {
            type: 'group',
            items: [
              {
                label: 'OpenSearch Dashboards URL (dual stack)',
                value: (
                  <SpaceBetween size="xxs">
                    <Link
                      external
                      href="https://search-hari-d2-qrlhob47bazon6vwlasylw6iam.aos.us-east-1.on.aws/_dashboards"
                    >
                      https://search-hari-d2-qrlhob47bazon6vwlasylw6iam.aos.us-east-1.on.aws/_dashboards
                    </Link>
                    <Link external>IPv4 URL</Link>
                  </SpaceBetween>
                )
              },
              {
                label: 'Domain endpoint v2 (dual stack)',
                value: (
                  <CopyToClipboard
                    copyErrorText="Endpoint failed to copy"
                    copySuccessText="Endpoint copied"
                    textToCopy="https://search-hari-d2-qrlhob47bazon6vwlasylw6iam.aos.us-east-1.on.aws"
                    variant="inline"
                  />
                )
              },
              {
                label: 'Domain endpoint (IPv4)',
                value: (
                  <CopyToClipboard
                    copyErrorText="Endpoint failed to copy"
                    copySuccessText="Endpoint copied"
                    textToCopy="https://search-hari-d2-qrlhob47bazon6vwlasylw6iam.us-east-1.es.amazonaws.com"
                    variant="inline"
                  />
                )
              }
            ]
          }
        ]}
      />
    </Container>
  );
}

function AuthorizePrincipalsModal({ visible, onDismiss, onAuthorize }) {
  const [authorizationType, setAuthorizationType] = useState('aws-services');
  const [selectedService, setSelectedService] = useState({
    label: 'OpenSearch applications (Dashboard)',
    value: 'opensearch-dashboard'
  });

  const serviceOptions = [
    { label: 'OpenSearch applications (Dashboard)', value: 'opensearch-dashboard' },
    { label: 'OpenSearch Service (Managed Operations)', value: 'opensearch-public-api' }
  ];

  const handleAuthorize = () => {
    console.log('Authorizing:', authorizationType, selectedService);
    onAuthorize();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      header="Authorize principals"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDismiss}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAuthorize}>
              Authorize
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Box>Authorize another AWS account to access this domain.</Box>
        <RadioGroup
          value={authorizationType}
          onChange={({ detail }) => setAuthorizationType(detail.value)}
          items={[
            {
              value: 'aws-account',
              label: 'Authorize another AWS account to access this domain.'
            },
            {
              value: 'aws-services',
              label: 'Authorize Principals from other AWS Services.'
            }
          ]}
        />
        {authorizationType === 'aws-services' && (
          <FormField>
            <Select
              selectedOption={selectedService}
              onChange={({ detail }) => setSelectedService(detail.selectedOption)}
              options={serviceOptions}
              placeholder="Select a service"
            />
          </FormField>
        )}
      </SpaceBetween>
    </Modal>
  );
}

function VPCIndexesAlert({ onCreateIndex, onOpenAuthModal, isAuthorized }) {
  const handleAuthorize = () => {
    console.log('Authorize principal clicked');
    onOpenAuthModal();
  };

  const handleCreateIndex = () => {
    console.log('Create index clicked');
    onCreateIndex();
  };

  if (!isAuthorized) {
    return (
      <Alert
        type="error"
        header="Access denied"
        action={
          <Button onClick={handleAuthorize}>
            Authorize principal
          </Button>
        }
      >
        The OpenSearch public API cannot access this VPC-enabled domain. To create indexes, you must first authorize access to this domain. Grant access using "Authorize principal", choose Authorize Principals from other AWS Services, select OpenSearch Public API, and authorize. Once authorized, you'll be able to create and manage indexes through the AWS Management Console.
      </Alert>
    );
  }

  return (
    <Alert
      type="info"
      action={
        <Button onClick={handleCreateIndex}>
          Create index
        </Button>
      }
    >
      This is a VPC-enabled domain. While you can create indexes using the "Create index" button, the index list cannot be displayed in the AWS Management Console due to VPC network restrictions. To view indexes, please access the OpenSearch Dashboards directly using the dashboard URL.
    </Alert>
  );
}

function DomainDetailsTabs({ onCreateIndex, onOpenAuthModal, isAuthorized }) {
  const [activeTabId, setActiveTabId] = useState('cluster-config');

  const tabs = [
    {
      id: 'cluster-config',
      label: 'Cluster configuration',
      content: <Container />
    },
    {
      id: 'security-config',
      label: 'Security configuration',
      content: <Container />
    },
    {
      id: 'cluster-health',
      label: 'Cluster health',
      content: <Container />
    },
    {
      id: 'instance-health',
      label: 'Instance health',
      content: <Container />
    },
    {
      id: 'off-peak-window',
      label: 'Off-peak window',
      content: <Container />
    },
    {
      id: 'auto-tune',
      label: 'Auto-tune',
      content: <Container />
    },
    {
      id: 'logs',
      label: 'Logs',
      content: <Container />
    },
    {
      id: 'indexes',
      label: 'Indexes - new',
      content: <VPCIndexesAlert onCreateIndex={onCreateIndex} onOpenAuthModal={onOpenAuthModal} isAuthorized={isAuthorized} />
    }
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTabId={activeTabId}
      onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
    />
  );
}

function DomainDetailsScreen({ onNavigateToCreateIndex, showSuccessFlashbar, onDismissFlashbar }) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [updateScheduled, setUpdateScheduled] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [showSecondFlashbar, setShowSecondFlashbar] = useState(false);
  const [preCheckFailed, setPreCheckFailed] = useState(false);

  const updateFlashbarItems = [];
  
  if (preCheckFailed) {
    updateFlashbarItems.push({
      type: 'error',
      dismissible: true,
      dismissLabel: 'Dismiss message',
      onDismiss: () => setPreCheckFailed(false),
      header: 'Service software update failed',
      content: (
        <span>
          Service software update OpenSearch_2_11_R20251106-P1 cannot be installed due to failure of pre-validation checks. This requires manual remediation from your end.{' '}
          <Link external href="#" variant="primary">Learn more</Link>
        </span>
      )
    });
  } else {
    if (showSecondFlashbar) {
      updateFlashbarItems.push({
        type: 'info',
        dismissible: false,
        content: (
          <span>
            <Box fontWeight="bold" display="inline">There's a software update scheduled to start at {scheduledDateTime} UTC.</Box>
            <br />
            If you request a configuration change and it overlaps with the scheduled service software update, the service software update will be postponed for three days.
          </span>
        )
      });
    }
  }

  const indexFlashbarItems = showSuccessFlashbar ? [
    {
      type: 'success',
      dismissible: true,
      dismissLabel: 'Dismiss message',
      onDismiss: onDismissFlashbar,
      header: 'Successfully created index index_1 for your domain.',
      content: "The index is now created. To view indexes, please access the OpenSearch Dashboards directly using the dashboard URL."
    }
  ] : [];

  const flashbarItems = [...updateFlashbarItems, ...indexFlashbarItems];

  const handleNavigationFollow = (event) => {
    if (!event.detail.external) {
      event.preventDefault();
      console.log('Navigate to:', event.detail.href);
    }
  };

  const handleCreateIndex = () => {
    onNavigateToCreateIndex();
  };

  const handleOpenAuthModal = () => {
    setModalVisible(true);
  };

  const handleModalAuthorize = () => {
    setModalVisible(false);
    setIsAuthorized(true);
  };

  const handleOpenUpdateModal = () => {
    setUpdateModalVisible(true);
  };

  const handleUpdateConfirm = (updateOption, scheduleDate, scheduleTime) => {
    setUpdateModalVisible(false);
    if (updateOption === 'schedule' && scheduleDate && scheduleTime) {
      // Format the date for display
      const date = new Date(scheduleDate);
      const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');
      const formattedDateTime = `${formattedDate} ${scheduleTime}:00`;
      setScheduledDateTime(formattedDateTime);
    } else {
      // Default datetime for "apply now" option
      setScheduledDateTime('Wed, 28 Jan 2026 20:01:04');
    }
    setUpdateScheduled(true);
    setShowSecondFlashbar(true);
    
    // After 15 seconds, change to error state
    setTimeout(() => {
      setPreCheckFailed(true);
      setShowSecondFlashbar(false);
    }, 15000);
  };

  const handleReschedule = () => {
    setUpdateModalVisible(true);
  };

  return (
    <>
      <AuthorizePrincipalsModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onAuthorize={handleModalAuthorize}
      />
      <ServiceSoftwareUpdateModal
        visible={updateModalVisible}
        onDismiss={() => setUpdateModalVisible(false)}
        onConfirm={handleUpdateConfirm}
      />
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { href: '#', text: 'Amazon OpenSearch Service' },
              { href: '#/domains', text: 'Domains' },
              { href: '#/domains/my-domain-1', text: 'my-domain-1' }
            ]}
          />
        }
        notifications={<Flashbar items={flashbarItems} />}
        content={
          <SpaceBetween size="m">
            <DomainPageHeader />
            <GeneralInformationContainer 
              onOpenUpdateModal={handleOpenUpdateModal} 
              updateScheduled={updateScheduled}
              scheduledDateTime={scheduledDateTime}
              onReschedule={handleReschedule}
              preCheckFailed={preCheckFailed}
            />
            <DomainDetailsTabs onCreateIndex={handleCreateIndex} onOpenAuthModal={handleOpenAuthModal} isAuthorized={isAuthorized || showSuccessFlashbar} />
          </SpaceBetween>
        }
        contentType="default"
        navigation={
          <SideNavigation
            activeHref="#/domains/my-domain-1"
            header={{
              href: '#',
              text: 'Amazon OpenSearch Service'
            }}
            items={[
              { href: '#', text: 'Dashboard', type: 'link' },
              { href: '#/domains', text: 'Domains', type: 'link' }
            ]}
            onFollow={handleNavigationFollow}
          />
        }
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      />
    </>
  );
}

export default DomainDetailsScreen;

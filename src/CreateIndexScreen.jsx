import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import SideNavigation from '@cloudscape-design/components/side-navigation';

function IndexDetailsSection({ indexName, setIndexName }) {
  return (
    <Container header={<Header variant="h2">Index details</Header>}>
      <SpaceBetween size="m">
        <Box variant="p">
          An index consists of search fields a nd automatic semantic enrichment fields.
        </Box>
        <FormField
          label="Index name"
          description="The name must be between 3 and 64 characters. Valid characters are a-z (lowercase only), 0-9 (numbers), _ (hyphen) and _ (underscore)."
        >
          <Input
            value={indexName}
            onChange={({ detail }) => setIndexName(detail.value)}
            placeholder="index_1"
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
}

function AutomaticSemanticEnrichmentSection({ fields, setFields }) {
  const [filteringText, setFilteringText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const columnDefinitions = [
    {
      id: 'indexField',
      header: 'Index field',
      cell: (item) => item.indexField,
      sortingField: 'indexField'
    },
    {
      id: 'inputFieldDataType',
      header: 'Input field data type',
      cell: (item) => item.inputFieldDataType
    },
    {
      id: 'language',
      header: 'Language',
      cell: (item) => item.language
    }
  ];

  const handleAddField = () => {
    console.log('Add field clicked');
  };

  const handleDeleteField = () => {
    console.log('Delete field clicked');
    setFields(fields.filter(field => !selectedItems.includes(field)));
    setSelectedItems([]);
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          info={<Link variant="info">Info</Link>}
          description={
            <>
              Ensure that you have the required data access and IAM policies to create automatic semantic enrichment fields.{' '}
              <Link external>Learn more</Link>
            </>
          }
        >
          Automatic semantic enrichment fields - <i>new</i> (1)
        </Header>
      }
    >
      <Table
        columnDefinitions={columnDefinitions}
        items={fields}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        filter={
          <TextFilter
            filteringPlaceholder="Search"
            filteringText={filteringText}
            onChange={({ detail }) => setFilteringText(detail.filteringText)}
          />
        }
        header={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button iconName="settings" variant="icon" />
              <Button
                disabled={selectedItems.length === 0}
                onClick={handleDeleteField}
              >
                Delete field
              </Button>
              <Button onClick={handleAddField}>
                Add field
              </Button>
            </SpaceBetween>
          </Box>
        }
        pagination={
          <Box textAlign="center" padding={{ vertical: 's' }}>
            <SpaceBetween direction="horizontal" size="xs" alignItems="center">
              <Button iconName="angle-left" variant="icon" disabled />
              <Box>1</Box>
              <Button iconName="angle-right" variant="icon" disabled />
            </SpaceBetween>
          </Box>
        }
      />
    </Container>
  );
}

function SearchFieldsSection({ searchFields, setSearchFields }) {
  const [filteringText, setFilteringText] = useState('');

  const columnDefinitions = [
    {
      id: 'searchField',
      header: 'Search field',
      cell: (item) => item.searchField,
      sortingField: 'searchField'
    },
    {
      id: 'dataType',
      header: 'Data type',
      cell: (item) => item.dataType,
      sortingField: 'dataType'
    }
  ];

  const handleAddField = () => {
    console.log('Add search field clicked');
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          description={
            <>
              Use for full-text searches that power applications such as ecommerce website search and content search.{' '}
              <Link external>Learn more</Link>
            </>
          }
        >
          Search fields (0)
        </Header>
      }
    >
      <Table
        columnDefinitions={columnDefinitions}
        items={searchFields}
        filter={
          <TextFilter
            filteringPlaceholder="Search"
            filteringText={filteringText}
            onChange={({ detail }) => setFilteringText(detail.filteringText)}
          />
        }
        header={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button iconName="settings" variant="icon" />
            </SpaceBetween>
          </Box>
        }
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" color="inherit">
              No Search fields
            </Box>
            <Box variant="p" color="inherit" padding={{ bottom: 's' }}>
              Start by creating a search field.
            </Box>
            <Button onClick={handleAddField}>
              Add field
            </Button>
          </Box>
        }
        pagination={
          <Box textAlign="center" padding={{ vertical: 's' }}>
            <SpaceBetween direction="horizontal" size="xs" alignItems="center">
              <Button iconName="angle-left" variant="icon" disabled />
              <Box>1</Box>
              <Button iconName="angle-right" variant="icon" disabled />
            </SpaceBetween>
          </Box>
        }
      />
    </Container>
  );
}

function CreateIndexScreen({ onCancel, onCreate }) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [indexName, setIndexName] = useState('index_1');
  const [enrichmentFields, setEnrichmentFields] = useState([
    {
      indexField: 'automatic-semantic-enrichment-25',
      inputFieldDataType: 'Data',
      language: 'English'
    }
  ]);
  const [searchFields, setSearchFields] = useState([]);

  const handleNavigationFollow = (event) => {
    if (!event.detail.external) {
      event.preventDefault();
      console.log('Navigate to:', event.detail.href);
    }
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    onCancel();
  };

  const handleCreate = () => {
    console.log('Create index:', indexName);
    onCreate();
  };

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { href: '#', text: 'Amazon OpenSearch Service' },
            { href: '#/domains', text: 'Domains' },
            { href: '#/domains/my-domain-1', text: 'my-domain-1' },
            { href: '#/domains/my-domain-1/create-index', text: 'Create index' }
          ]}
        />
      }
      content={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            info={<Link variant="info">Info</Link>}
          >
            Create index
          </Header>
          <IndexDetailsSection indexName={indexName} setIndexName={setIndexName} />
          <AutomaticSemanticEnrichmentSection
            fields={enrichmentFields}
            setFields={setEnrichmentFields}
          />
          <SearchFieldsSection
            searchFields={searchFields}
            setSearchFields={setSearchFields}
          />
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                Create
              </Button>
            </SpaceBetween>
          </Box>
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
  );
}

export default CreateIndexScreen;

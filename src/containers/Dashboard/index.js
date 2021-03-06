import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import CollapsibleSection from '../../components/CollapsibleSection';
import NetWorth from './NetWorth';
import Accounts from './Accounts';
import TransactionForm from '../Transactions/Form';
import RecentTransactions from './RecentTransactions';
import { loadAccounts } from '../../actions/entities/accounts';
import { loadRecentTransactions } from '../../actions/entities/transactions';
import { loadTags } from '../../actions/entities/tags';
import AssetAllocation from 'components/AssetAllocation';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.loadTags();
    this.props.loadAccounts();
    this.props.loadRecentTransactions();
  }

  render() {
    return (
      <div className="container-full-page">
        <Grid>
          <Grid.Row>
            <Grid.Column computer={7} mobile={16}>
              <CollapsibleSection
                name="net_worth"
                label="Net Worth"
                LabelComponent={NetWorth}
              >
                <AssetAllocation/>
                <Accounts />
              </CollapsibleSection>
            </Grid.Column>
            <Grid.Column computer={9} mobile={16}>
              <CollapsibleSection name="add_tx" label="New Transaction">
                <TransactionForm />
              </CollapsibleSection>
              <CollapsibleSection name="recent_tx" label="Recent Transactions">
                <RecentTransactions />
              </CollapsibleSection>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  loadTags: PropTypes.func,
  loadAccounts: PropTypes.func,
  loadRecentTransactions: PropTypes.func
};

export default connect(
  undefined,
  {
    loadTags,
    loadAccounts,
    loadRecentTransactions
  }
)(Dashboard);

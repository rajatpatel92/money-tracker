import React from 'react';
import { connect } from 'react-redux';
import { getLiquidAssets, getNonLiquidAssets } from 'selectors/entities/accounts';
import { getBaseCurrency } from 'selectors/settings';
import Amount from 'components/Amount';

const AssetAllocation = ({ liquidAccountsSum, nonLiquidAccountsSum, baseCurrency }) => {
    return (
        <div class="asset-allocation-widget" style={{ marginBottom : '1em' }}>
            <div class="account-widget-account">
                <div class="account-widget-account__name">
                    Liquid Accounts
                </div>
                <div className="account-widget-account__balance">
                    <Amount value={liquidAccountsSum} code={baseCurrency} showCents={false} />
                </div>
            </div>
            <div class="account-widget-account">
                <div class="account-widget-account__name">
                    Non-Liquid Accounts
                </div>
                <div className="account-widget-account__balance">
                    <Amount value={nonLiquidAccountsSum} code={baseCurrency} showCents={false} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    liquidAccountsSum: getLiquidAssets(state),
    nonLiquidAccountsSum: getNonLiquidAssets(state),
    baseCurrency: getBaseCurrency(state)
});

export default connect(mapStateToProps)(AssetAllocation);

/* <div className="section__subheader">
            <h3>Liquid Accounts</h3>
            <div className="asset__total">
                <Amount value={liquidAccountsSum} code={baseCurrency} showCents={false} />
            </div>
        </div> */
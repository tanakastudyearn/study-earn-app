import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Title, 
  Paragraph,
  List,
  Divider,
  Portal,
  Modal,
  TextInput,
  RadioButton
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, styles as globalStyles } from '../constants/theme';

const WalletScreen = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [withdrawing, setWithdrawing] = useState(false);

  const mockData = {
    points: 1250,
    earnings: 12.50,
    pendingPoints: 100,
    transactions: [
      {
        id: 1,
        type: 'earning',
        description: 'Course completion bonus',
        points: 50,
        date: '2023-11-15',
      },
      {
        id: 2,
        type: 'earning',
        description: 'Upload views reward',
        points: 25,
        date: '2023-11-14',
      },
      {
        id: 3,
        type: 'withdrawal',
        description: 'PayPal withdrawal',
        amount: -5.00,
        date: '2023-11-10',
      },
    ],
  };

  const handleWithdraw = () => {
    setWithdrawing(true);
    // Simulate withdrawal process
    setTimeout(() => {
      setWithdrawing(false);
      setShowWithdrawModal(false);
      // Show success message
    }, 2000);
  };

  const renderBalanceCard = () => (
    <Card style={styles.balanceCard}>
      <Card.Content>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>${mockData.earnings.toFixed(2)}</Text>
            <Text style={styles.pointsText}>{mockData.points} Points</Text>
          </View>
          <Button
            mode="contained"
            onPress={() => setShowWithdrawModal(true)}
            disabled={mockData.earnings < 5}
          >
            Withdraw
          </Button>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.pendingContainer}>
          <Text style={styles.pendingLabel}>Pending Points:</Text>
          <Text style={styles.pendingPoints}>{mockData.pendingPoints} Points</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderEarningRates = () => (
    <Card style={styles.ratesCard}>
      <Card.Content>
        <Title style={styles.ratesTitle}>Earning Rates</Title>
        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>Points to Cash Rate:</Text>
          <Text style={styles.rateValue}>100 Points = $1.00</Text>
        </View>
        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>Minimum Withdrawal:</Text>
          <Text style={styles.rateValue}>$5.00 (500 Points)</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderTransactionHistory = () => (
    <Card style={styles.transactionsCard}>
      <Card.Content>
        <Title style={styles.transactionsTitle}>Transaction History</Title>
        {mockData.transactions.map((transaction) => (
          <React.Fragment key={transaction.id}>
            <List.Item
              title={transaction.description}
              description={transaction.date}
              right={() => (
                <View style={styles.transactionAmount}>
                  <Text style={[
                    styles.amountText,
                    { color: transaction.type === 'earning' ? theme.colors.success : theme.colors.error }
                  ]}>
                    {transaction.points ? 
                      `+${transaction.points} pts` : 
                      `$${Math.abs(transaction.amount).toFixed(2)}`
                    }
                  </Text>
                </View>
              )}
            />
            <Divider />
          </React.Fragment>
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={globalStyles.container}>
      {renderBalanceCard()}
      {renderEarningRates()}
      {renderTransactionHistory()}

      <Portal>
        <Modal
          visible={showWithdrawModal}
          onDismiss={() => setShowWithdrawModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Withdraw Earnings</Title>
          <TextInput
            label="Amount ($)"
            value={withdrawAmount}
            onChangeText={setWithdrawAmount}
            keyboardType="decimal-pad"
            style={styles.amountInput}
            mode="outlined"
          />
          
          <Title style={styles.paymentMethodTitle}>Payment Method</Title>
          <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
            <View style={styles.radioItem}>
              <RadioButton value="paypal" />
              <Text>PayPal</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="gcash" />
              <Text>GCash</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="bank" />
              <Text>Bank Transfer</Text>
            </View>
          </RadioButton.Group>

          <Button
            mode="contained"
            onPress={handleWithdraw}
            loading={withdrawing}
            style={styles.withdrawButton}
            disabled={!withdrawAmount || withdrawing}
          >
            {withdrawing ? 'Processing...' : 'Withdraw'}
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  pointsText: {
    color: theme.colors.success,
    fontWeight: '500',
  },
  divider: {
    marginVertical: theme.spacing.md,
  },
  pendingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pendingLabel: {
    color: theme.colors.textSecondary,
  },
  pendingPoints: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  ratesCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  ratesTitle: {
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  rateLabel: {
    color: theme.colors.textSecondary,
  },
  rateValue: {
    fontWeight: '500',
  },
  transactionsCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.xl,
  },
  transactionsTitle: {
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontWeight: '500',
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    margin: theme.spacing.lg,
    borderRadius: theme.roundness,
  },
  modalTitle: {
    marginBottom: theme.spacing.lg,
  },
  amountInput: {
    marginBottom: theme.spacing.lg,
  },
  paymentMethodTitle: {
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  withdrawButton: {
    marginTop: theme.spacing.lg,
  },
});

export default WalletScreen;

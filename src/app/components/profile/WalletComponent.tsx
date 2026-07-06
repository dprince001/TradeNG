"use client";

import Button from "@/app/components/Button";
import { formatNaira } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Input from "@/app/components/Input";
import { WalletSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetWalletQuery,
  useGetWalletLedgerQuery,
  useGetPayoutBanksQuery,
  useAddPayoutBankMutation,
  useRequestWithdrawalMutation,
} from "@/app/redux/api/walletApiSlice";

const ledgerLabels: Record<string, string> = {
  ESCROW_HOLD: "Payment secured in escrow",
  ESCROW_RELEASE: "Payment released to you",
  WITHDRAWAL_HOLD: "Withdrawal to bank",
  WITHDRAWAL_REVERSAL: "Withdrawal reversed",
};

const WalletComponent = () => {
  const { data: walletData, isFetching: walletLoading } = useGet(useGetWalletQuery, "");
  const { data: ledgerData } = useGet(useGetWalletLedgerQuery, "");
  const { data: banksData, refetch: refetchBanks } = useGet(useGetPayoutBanksQuery, "");

  const { handlePost: addBank, isLoading: addingBank } = usePost(useAddPayoutBankMutation);
  const { handlePost: requestWithdrawal, isLoading: withdrawing } = usePost(useRequestWithdrawalMutation);

  const [showWalletModal, setShowWalletModal] = useState<"withdraw" | "add-bank" | null>(null);
  const [modalAmount, setModalAmount] = useState("");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const wallet = walletData?.wallet;
  const ledger = ledgerData?.ledger || [];
  const banks = banksData?.payout_banks || [];

  const closeModal = () => {
    setShowWalletModal(null);
    setModalAmount("");
    setBankName("");
    setAccountNumber("");
    setAccountName("");
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(modalAmount);
    if (!selectedBankId || isNaN(amount) || amount <= 0) return;
    const response = await requestWithdrawal({ amount, payout_bank_id: selectedBankId });
    if (response?.success !== false) closeModal();
  };

  const handleAddBank = async () => {
    if (!bankName || !accountNumber || !accountName) return;
    const response = await addBank({ bank_name: bankName, account_number: accountNumber, account_name: accountName });
    if (response?.success !== false) {
      refetchBanks();
      closeModal();
    }
  };

  if (walletLoading) {
    return (
      <div className="flex-1 px-5 pt-6 pb-24">
        <WalletSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      <div className="bg-brand-gradient rounded-3xl p-6 text-white shadow-[0_10px_24px_rgba(255,67,4,0.15)] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none" />

        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70 block">
          Available Balance
        </span>
        <h2 className="text-3xl font-extrabold mt-1.5 tracking-tight">
          {formatNaira(wallet?.available_balance ?? 0)}
        </h2>

        <div>
          <div className="grid grid-cols-1 gap-3 pt-4">
            <div className="bg-gray-50/30 my-6 p-4 rounded-md">
              <span className="text-[9px] font-semibold text-white/60 uppercase block">
                In Escrow
              </span>
              <span className="text-xs font-bold mt-0.5 block">
                {formatNaira(wallet?.escrow_balance ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowWalletModal("withdraw")}
              className="flex-1 bg-gray-50/30 hover:bg-white/20 active:scale-95 text-xs items-center justify-center gap-1.5"
            >
              Withdraw
            </Button>
            <Button
              onClick={() => setShowWalletModal("add-bank")}
              className="flex-1 bg-gray-50/30 hover:bg-white/20 active:scale-95 text-xs items-center justify-center gap-1.5"
            >
              Add Payout Bank
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#FFF5F3] border border-primary/5 rounded-2xl p-4 mt-5 flex items-start gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <span className="text-[10px] text-text-secondary leading-relaxed font-semibold">
          Funds are held safely until buyer confirms delivery
        </span>
      </div>

      <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-7 mb-3.5">
        Transaction History
      </h3>

      {ledger.length === 0 ? (
        <p className="text-text-secondary text-xs">No wallet activity yet.</p>
      ) : (
        <FadeInStagger className="flex flex-col gap-3">
          {ledger.map((tx: any) => {
            const isCredit = tx.type === "ESCROW_RELEASE" || tx.type === "WITHDRAWAL_REVERSAL";
            return (
              <FadeInItem
                key={tx.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${
                      isCredit ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                    } flex items-center justify-center flex-shrink-0`}
                  >
                    {isCredit ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                        <polyline points="17 18 23 18 23 12" />
                      </svg>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-bold text-[#1D1E20] leading-tight">
                      {ledgerLabels[tx.type] || tx.type}
                    </span>
                    <span className="text-[11px] text-[#8F959E] font-medium">
                      {new Date(tx.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-extrabold ${isCredit ? "text-green-600" : "text-red-500"}`}>
                  {isCredit ? "+" : "-"}
                  {formatNaira(Math.abs(tx.amount))}
                </span>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      )}

      <Dialog open={showWalletModal !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-sm rounded-3xl p-6 bg-white border border-gray-150">
          {showWalletModal === "withdraw" ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-base font-extrabold text-[#1D1E20] leading-none mb-1">
                  Withdraw Funds
                </DialogTitle>
                <DialogDescription className="text-[10px] text-text-secondary leading-normal mb-2">
                  Choose a payout bank and the amount you wish to withdraw.
                </DialogDescription>
              </DialogHeader>

              {banks.length === 0 ? (
                <p className="text-xs text-text-secondary my-3">
                  Add a payout bank first before requesting a withdrawal.
                </p>
              ) : (
                <div className="flex flex-col gap-3 my-3">
                  <Input
                    type="select"
                    label="Payout Bank"
                    value={selectedBankId}
                    onChange={(e) => setSelectedBankId(e.target.value)}
                    options={banks.map((b: any) => ({
                      label: `${b.bank_name} · ${b.account_number}`,
                      value: b.id,
                    }))}
                  />
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-extrabold text-sm">
                      ₦
                    </span>
                    <input
                      type="number"
                      value={modalAmount}
                      onChange={(e) => setModalAmount(e.target.value)}
                      placeholder="0"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1D1E20] placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 text-[#1D1E20] border-gray-200" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  loading={withdrawing}
                  disabled={banks.length === 0}
                  onClick={handleWithdraw}
                >
                  Confirm
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-base font-extrabold text-[#1D1E20] leading-none mb-1">
                  Add Payout Bank
                </DialogTitle>
                <DialogDescription className="text-[10px] text-text-secondary leading-normal mb-2">
                  Link a bank account to withdraw your earnings to.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 my-3">
                <Input label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. Guaranty Trust Bank" />
                <Input label="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="0123456789" />
                <Input label="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Account holder name" />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 text-[#1D1E20] border-gray-200" onClick={closeModal}>
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1" loading={addingBank} onClick={handleAddBank}>
                  Save Bank
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletComponent;

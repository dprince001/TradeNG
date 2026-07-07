export const getOfferLabel = (message: any, sellerId?: string) => {
  const senderIsSeller = message.sender_id === sellerId;
  const role = senderIsSeller ? "Seller" : "Buyer";
  const status = message?.offer?.status;

  const verb = message?.offer?.parent_offer_id
    ? "countered with"
    : status === "ACCEPTED"
      ? "accepted"
      : status === "DECLINED"
        ? "declined"
        : "offered";

  return `${role} ${verb}`;
};

export const canRespondToOffer = (message: any, isMine: boolean) => {
  const status = message?.offer?.status;
  // Bidirectional: only whoever did *not* propose the current offer may accept/counter/decline it.
  return !isMine && status !== "ACCEPTED" && status !== "DECLINED";
};

export const formatMessageTime = (createdAt?: string) => {
  if (!createdAt) return "";
  return new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatConversationTime = (createdAt?: string) => {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  const isToday = date.toDateString() === new Date().toDateString();
  return isToday
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString([], { month: "short", day: "numeric" });
};

export const getConversationCounterpart = (conversation: any, currentUserId?: string) => {
  const listing = conversation?.listing ?? {};
  const seller = conversation?.seller ?? listing?.seller ?? listing?.user;
  const buyer = conversation?.buyer ?? conversation?.participant;
  const isSelfSeller = !!currentUserId && seller?.id === currentUserId;

  return isSelfSeller ? buyer : seller;
};

export const getFullName = (person: any, fallback = "User") => {
  if (!person) return fallback;
  return `${person.first_name ?? ""} ${person.last_name ?? ""}`.trim() || fallback;
};

export const getConversationItemId = (conversation: any) =>
  conversation?.listing_id ?? conversation?.listing?.id ?? null;

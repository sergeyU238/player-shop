export enum VendorKeyOrderStatus {
  CREATED = 'created', // создан
  PROCESSING = 'processing', // идет поиск ключа
  READY = 'ready', // готов
  WAITING = 'waiting_for_key', // ожидает ключа
}

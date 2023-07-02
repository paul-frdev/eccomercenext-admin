
import React from 'react'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/useStoreModal'

export const StoreModal = () => {

  const storeModal = useStoreModal()
  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create future dashboard for eccomerce
    </Modal>
  )
}

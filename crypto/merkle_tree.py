import hashlib
import json
import logging
from typing import List

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("Crypto-Merkle")

class MerkleTree:
    """
    Enterprise Cryptographic Merkle Tree Generator.
    Used to mathematically seal thousands of audit logs into a single 64-character Root Hash.
    """

    def __init__(self, items: List[dict]):
        self.leaves = [self._hash_payload(item) for item in items]
        if not self.leaves:
            raise ValueError("Merkle Tree requires at least one leaf node.")
        self.layers = [self.leaves]
        self.root_hash = self._build_tree()

    def _hash_payload(self, payload: dict) -> str:
        """Securely stringify and hash a JSON payload (the audit event)."""
        payload_str = json.dumps(payload, sort_keys=True).encode('utf-8')
        return hashlib.sha256(payload_str).hexdigest()

    def _build_tree(self) -> str:
        """Recursively builds the tree layers by hashing pairs of nodes."""
        current_layer = self.leaves
        while len(current_layer) > 1:
            next_layer = []
            for i in range(0, len(current_layer), 2):
                left = current_layer[i]
                # If odd number of nodes, duplicate the last node
                right = current_layer[i+1] if i+1 < len(current_layer) else left
                
                combined = (left + right).encode('utf-8')
                next_layer.append(hashlib.sha256(combined).hexdigest())
                
            self.layers.append(next_layer)
            current_layer = next_layer
            
        return current_layer[0]

    def get_root(self) -> str:
        return self.root_hash

    def get_proof(self, target_index: int) -> List[str]:
        """
        Generates the mathematical chain of sibling hashes required to 
        prove a specific leaf is part of the sealed root hash.
        Used for Forensic Verification Engine.
        """
        if target_index < 0 or target_index >= len(self.leaves):
            raise IndexError("Leaf index out of bounds.")
            
        proof = []
        current_idx = target_index
        
        for layer in self.layers[:-1]: # Go through all layers except the Root
            is_right_node = current_idx % 2 == 1
            
            if is_right_node:
                sibling_idx = current_idx - 1
            else:
                sibling_idx = current_idx + 1 if current_idx + 1 < len(layer) else current_idx
                
            proof.append(layer[sibling_idx])
            current_idx = current_idx // 2
            
        return proof

if __name__ == "__main__":
    logger.info("Initializing Unit Test for Immutable Cryptography Validation...")
    
    # Simulate 3 Audit Events
    events = [
        {"actor": "bob@corp.com", "action": "DELETE_DB", "timestamp": "2026-04-12T10:00:00Z"},
        {"actor": "alice@corp.com", "action": "LOGIN", "timestamp": "2026-04-12T10:05:00Z"},
        {"actor": "system", "action": "BACKUP", "timestamp": "2026-04-12T10:10:00Z"}
    ]
    
    tree = MerkleTree(events)
    logger.info(f"Sealed Merkle Root Hash: {tree.get_root()}")
    
    proof = tree.get_proof(1)
    logger.info(f"Cryptographic Proof Array for Alice's Login Event: {proof}")

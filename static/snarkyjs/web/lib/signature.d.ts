import { Group, Field, Bool, Scalar } from '../snarky';
import { CircuitValue } from './circuit_value';
/**
 * A signing key. You can generate one via [[random]].
 */
export declare class PrivateKey extends CircuitValue {
    s: Scalar;
    constructor(s: Scalar);
    /**
     * You can use this method to generate a private key. You can then obtain
     * the associated public key via [[toPublicKey]]. And generate signatures
     * via [[Signature.create]].
     *
     * @returns a new [[PrivateKey]].
     */
    static random(): PrivateKey;
    /**
     * Deserializes a list of bits into a [[PrivateKey]].
     *
     * @param bs a list of [[Bool]]s.
     * @returns a [[PrivateKey]].
     */
    static ofBits(bs: Bool[]): PrivateKey;
    /**
     * Derives the associated public key.
     *
     * @returns a [[PublicKey]].
     */
    toPublicKey(): PublicKey;
}
export declare class PublicKey extends CircuitValue {
    g: Group;
    constructor(g: Group);
    static fromPrivateKey(p: PrivateKey): PublicKey;
}
export declare class Signature extends CircuitValue {
    r: Field;
    s: Scalar;
    constructor(r: Field, s: Scalar);
    static create(privKey: PrivateKey, msg: Field[]): Signature;
    verify(publicKey: PublicKey, msg: Field[]): Bool;
}

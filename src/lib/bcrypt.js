import bcrypt from 'bcryptjs';

export const encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

export const matchPassword = async (password,savePassword)=>{
    return await bcrypt.compare(password,savePassword);
};
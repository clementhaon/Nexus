import express from "express";
import jsonwebtoken from "jsonwebtoken";
const app = express.Router();


const testT = (req, res) => {

    try {

        return res.status(200).json('lee');

    } catch (err) {
        console.log(err)

        return res.status(500).send({success:false, message: err?.message ? err?.message : ""});

    }


}

const updateUser = async (req, res) => {

    try {

        const user = await models.user.findByPk(req.user.id);
        if (!user) throw new Error("User not found");

        if (req.body.contributionId && Array.isArray(req.body.contributionId)) {
            const contributions = await models.contributions.findAll({where: {id: req.body.contributionId}});
            if (!contributions) throw new Error("Contributions not found");
            await user.setContributions(contributions);
        }

        //the same of contribution but soft skills
        if (req.body.softSkillsId && Array.isArray(req.body.softSkillsId)) {
            const softSkills = await models.soft_skills.findAll({where: {id: req.body.softSkillsId}});
            if (!softSkills) throw new Error("Soft skills not found");
            await user.setSoft_skills(softSkills);
        }

        //the same of contribution but technical skills
        if (req.body.technicalSkillsId && Array.isArray(req.body.technicalSkillsId)) {
            const technicalSkills = await models.technical_skills.findAll({where: {id: req.body.technicalSkillsId}});
            if (!technicalSkills) throw new Error("Technical skills not found");
            await user.setTechnical_skills(technicalSkills);
        }

        if (req.body.user) {
            //TODO manage if user want to update email or password
            await user.update(req.body.user);
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({success:false, message: err?.message ? err?.message : ""});
    }
}

const oneUser = async (req, res) => {
    try {
        const user = await models.user.scope("all").findOne({ 
            where: { id: req.user.id },
            include: { all: true, nested: true, required: false, as: 'user' }
        });
        if (!user) throw new Error("User not found");
        return res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).send({success:false, message: err?.message ? err?.message : ""});
    }
}

app.get('/test', testT);
app.put('/update', updateUser);
app.get('/me', oneUser)

export default app;
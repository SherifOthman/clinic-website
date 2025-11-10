import { Card, CardBody } from "@heroui/card";
import { BarChart3, Calendar, Shield, Users } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Users className="text-primary" size={32} />,
      title: "Patient-Centered Care",
      description:
        "We believe healthcare technology should enhance the patient experience, not complicate it.",
    },
    {
      icon: <Shield className="text-primary" size={32} />,
      title: "Security First",
      description:
        "HIPAA compliance and data security are built into every aspect of our platform.",
    },
    {
      icon: <Calendar className="text-primary" size={32} />,
      title: "Efficiency",
      description:
        "Streamline workflows to give healthcare providers more time with their patients.",
    },
    {
      icon: <BarChart3 className="text-primary" size={32} />,
      title: "Data-Driven Insights",
      description:
        "Empower practices with actionable analytics to improve patient outcomes.",
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-24">
      {/* Hero Section */}
      <div className="mb-20">
        <h1 className="mb-6 text-5xl font-bold lg:text-6xl">
          About ClinicFlow
        </h1>
        <p className="text-default-500 max-w-3xl text-xl leading-relaxed">
          We're on a mission to transform healthcare practice management through
          innovative technology that puts patients first and empowers healthcare
          professionals.
        </p>
      </div>

      <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
          <div className="text-default-500 space-y-4 leading-relaxed">
            <p>
              ClinicFlow was founded by a team of healthcare professionals and
              technology experts who experienced firsthand the challenges of
              managing a modern medical practice.
            </p>
            <p>
              Frustrated by outdated systems that hindered rather than helped
              patient care, we set out to create a platform that would truly
              serve the needs of healthcare providers and their patients.
            </p>
            <p>
              Today, ClinicFlow serves over 1,000 healthcare practices
              worldwide, helping them streamline operations, improve patient
              outcomes, and focus on what matters most - providing exceptional
              care.
            </p>
          </div>
        </div>
        <div className="from-primary/10 to-primary/20 flex items-center justify-center rounded-2xl bg-gradient-to-br p-8">
          <div className="text-center">
            <div className="text-primary mb-2 text-4xl font-bold">1000+</div>
            <div className="text-default-500 mb-6">Healthcare Practices</div>
            <div className="text-primary mb-2 text-4xl font-bold">50,000+</div>
            <div className="text-default-500 mb-6">Patients Served</div>
            <div className="text-primary mb-2 text-4xl font-bold">99.9%</div>
            <div className="text-default-500">Uptime</div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
          <p className="text-default-500 max-w-2xl text-xl">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardBody className="p-8 text-center">
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="text-default-500 leading-relaxed">
                  {value.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-3xl font-bold">
          Built by Healthcare Professionals
        </h2>
        <p className="text-default-500 mb-8 max-w-3xl text-xl leading-relaxed">
          Our team combines deep healthcare industry knowledge with cutting-edge
          technology expertise to deliver solutions that truly understand the
          needs of medical practices.
        </p>
        <div className="bg-default-50 mx-auto max-w-4xl rounded-2xl p-8">
          <p className="mb-4 text-lg font-medium italic">
            "ClinicFlow has transformed how we manage our practice. What used to
            take hours now takes minutes, and our patients love the streamlined
            experience."
          </p>
          <p className="text-default-500 font-medium">
            - Dr. Sarah Johnson, Family Medicine
          </p>
        </div>
      </div>
    </div>
  );
}

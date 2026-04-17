'use client'

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ResumeData, ResumeExperience, ResumeProject, ResumeSkillGroup } from '@/data/resume';
import { Role } from '@/context/RoleContext';
import { useEffect, useState } from 'react';

// Register fonts if needed, or use defaults
// For now, using standard sans-serif

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    color: '#333333',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#00F5FF',
    paddingBottom: 10,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#00F5FF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 10,
  },
  contactItem: {
    fontSize: 9,
    color: '#666666',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#00F5FF',
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00F5FF',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
    marginBottom: 10,
  },
  objective: {
    fontSize: 10,
    fontStyle: 'italic',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expRole: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  expOrg: {
    fontSize: 10,
    color: '#00F5FF',
  },
  expPeriod: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: '#00F5FF',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillBadge: {
    fontSize: 8,
    padding: '2 5',
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectTagline: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
  }
});

interface Props {
  data: ResumeData;
  activeRole: Role;
  activeRoleLabel: string;
}

export const ResumePDFDocument = ({ data, activeRole, activeRoleLabel }: Props) => {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const photoSrc = data.identity.photo 
    ? (data.identity.photo.startsWith('http') ? data.identity.photo : `${origin}${data.identity.photo}`)
    : null;

  // Filtering logic mirrored from components
  const filteredSkills = data.skills.map(group => ({
    ...group,
    skills: group.skills.filter(s => 
      activeRole === 'all' || 
      s.tags.some(tag => tag.toLowerCase().includes(activeRole.toLowerCase())) ||
      s.tags.includes('core')
    )
  })).filter(group => group.skills.length > 0);

  const filteredExperience = [...data.experience].sort((a, b) => {
    if (activeRole === 'all') return 0;
    const aMatch = a.tags.some(t => t.toLowerCase().includes(activeRole.toLowerCase()));
    const bMatch = b.tags.some(t => t.toLowerCase().includes(activeRole.toLowerCase()));
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  const filteredProjects = data.projects.filter(p => 
    activeRole === 'all' || p.tags.some(tag => tag.toLowerCase().includes(activeRole.toLowerCase()))
  );

  return (
    <Document title={`${data.identity.name} - ${activeRoleLabel} Resume`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.identity.name}</Text>
            <Text style={styles.role}>{activeRoleLabel}</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>{data.identity.email}</Text>
              <Text style={styles.contactItem}>{data.identity.location}</Text>
              <Text style={styles.contactItem}>github.com/farhanmallik05</Text>
              <Text style={styles.contactItem}>linkedin.com/in/farhanmallik</Text>
            </View>
          </View>
          {photoSrc && (
            <Image 
              src={photoSrc} 
              style={styles.photo} 
            />
          )}
        </View>

        {/* Objective */}
        <View style={styles.section}>
          <Text style={styles.objective}>"{data.objectives[activeRole]}"</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {filteredExperience.map((exp, idx) => (
            <View key={idx} style={styles.experienceItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expPeriod}>{exp.period}</Text>
              </View>
              <Text style={styles.expOrg}>{exp.organization} • {exp.location}</Text>
              {exp.details.map((detail, dIdx) => (
                <View key={dIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{detail}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECTS</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {filteredProjects.map((proj, idx) => (
              <View key={idx} style={[styles.projectItem, { width: '48%' }]}>
                <Text style={styles.projectName}>{proj.name}</Text>
                <Text style={styles.projectTagline}>{proj.tagline}</Text>
                {proj.outcomes.slice(0, 2).map((outcome, oIdx) => (
                  <View key={oIdx} style={styles.bulletItem}>
                    <Text style={styles.bullet}>›</Text>
                    <Text style={styles.bulletText}>{outcome}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Skills Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILL MATRIX</Text>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {filteredSkills.map((group, idx) => (
              <View key={idx} style={{ flex: 1 }}>
                <Text style={styles.skillLabel}>{group.category}</Text>
                <View style={styles.skillGrid}>
                  {group.skills.map((s, sIdx) => (
                    <Text key={sIdx} style={styles.skillBadge}>{s.name}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Education & Achievements */}
        <View style={{ flexDirection: 'row', gap: 20, marginTop: 15 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {data.education.map((edu, idx) => (
              <View key={idx}>
                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{edu.degree}</Text>
                <Text style={{ fontSize: 9 }}>{edu.institution}</Text>
                <Text style={{ fontSize: 8, color: '#666' }}>{edu.duration}</Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
            {data.achievements.map((ach, idx) => (
              <View key={idx} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{ach.title}</Text>
                <Text style={{ fontSize: 8 }}>{ach.issuer} • {ach.year}</Text>
              </View>
            ))}
          </View>
        </View>

      </Page>
    </Document>
  );
};

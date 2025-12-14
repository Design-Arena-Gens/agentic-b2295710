'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Shield, Users, MessageSquare, Ban, UserPlus,
  Settings, Activity, AlertTriangle, CheckCircle,
  Crown, Bot, Zap, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'agent' | 'system';
}

interface Member {
  id: string;
  name: string;
  role: 'admin' | 'member';
  warnings: number;
  joinDate: Date;
}

interface AgentAction {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed';
}

export default function WhatsAppGuildManager() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Guild Agent',
      content: 'Namaste! Main aapke WhatsApp group ka Guild Manager hoon. Main automatically spam detect karta hoon, rules enforce karta hoon, aur group ko organize rakhta hoon.',
      timestamp: new Date(),
      type: 'agent'
    }
  ]);

  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Rahul Kumar', role: 'admin', warnings: 0, joinDate: new Date('2024-01-15') },
    { id: '2', name: 'Priya Sharma', role: 'member', warnings: 0, joinDate: new Date('2024-02-20') },
    { id: '3', name: 'Amit Patel', role: 'member', warnings: 1, joinDate: new Date('2024-03-10') },
    { id: '4', name: 'Sneha Gupta', role: 'member', warnings: 0, joinDate: new Date('2024-03-25') },
    { id: '5', name: 'Vikram Singh', role: 'member', warnings: 2, joinDate: new Date('2024-04-05') },
  ]);

  const [agentActions, setAgentActions] = useState<AgentAction[]>([
    { id: '1', type: 'spam_detected', description: 'Detected spam message from user', timestamp: new Date(Date.now() - 300000), status: 'success' },
    { id: '2', type: 'warning_issued', description: 'Warned member for inappropriate content', timestamp: new Date(Date.now() - 180000), status: 'success' },
    { id: '3', type: 'auto_moderation', description: 'Deleted promotional link', timestamp: new Date(Date.now() - 60000), status: 'success' },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [agentStatus, setAgentStatus] = useState<'active' | 'idle'>('active');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate agent activity
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();

      if (random > 0.7) {
        const actions = [
          { type: 'auto_moderation', description: 'Automatically moderated excessive messages' },
          { type: 'member_welcome', description: 'Welcomed new member to the group' },
          { type: 'spam_prevention', description: 'Blocked suspicious link' },
          { type: 'activity_summary', description: 'Generated daily activity report' },
          { type: 'rule_enforcement', description: 'Reminded members about group rules' },
        ];

        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        setAgentActions(prev => [
          {
            id: Date.now().toString(),
            type: randomAction.type,
            description: randomAction.description,
            timestamp: new Date(),
            status: 'success'
          },
          ...prev.slice(0, 9)
        ]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: inputMessage,
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        'Main aapki request process kar raha hoon. Group rules update ho gaye hain.',
        'Samajh gaya! Main automatically handle kar loonga ye task.',
        'Done! Maine spam filter ko update kar diya hai.',
        'Good idea! Main immediately implement kar raha hoon.',
        'Group security settings update ho gayi hain. Sab secure hai.',
        'Main group activity ko monitor kar raha hoon. Sab theek chal raha hai.',
      ];

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'Guild Agent',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'agent'
      };

      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleWarnMember = (memberId: string) => {
    setMembers(prev => prev.map(m =>
      m.id === memberId ? { ...m, warnings: m.warnings + 1 } : m
    ));

    const member = members.find(m => m.id === memberId);

    setAgentActions(prev => [
      {
        id: Date.now().toString(),
        type: 'warning_issued',
        description: `Warning issued to ${member?.name}`,
        timestamp: new Date(),
        status: 'success'
      },
      ...prev
    ]);

    const systemMessage: Message = {
      id: Date.now().toString(),
      sender: 'System',
      content: `⚠️ Guild Agent ne ${member?.name} ko warning di hai.`,
      timestamp: new Date(),
      type: 'system'
    };

    setMessages(prev => [...prev, systemMessage]);
  };

  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.warnings < 2).length,
    totalWarnings: members.reduce((sum, m) => sum + m.warnings, 0),
    agentActions: agentActions.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-whatsapp-dark to-emerald-700 text-white rounded-2xl p-6 mb-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  WhatsApp Guild Manager
                  <Crown className="w-6 h-6 text-yellow-300" />
                </h1>
                <p className="text-emerald-100 text-sm mt-1">Autonomous AI Agent for Group Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                agentStatus === 'active'
                  ? 'bg-green-400/30 text-green-100'
                  : 'bg-gray-400/30 text-gray-100'
              }`}>
                <Activity className={`w-4 h-4 ${agentStatus === 'active' ? 'animate-pulse' : ''}`} />
                <span className="font-medium">{agentStatus === 'active' ? 'Active' : 'Idle'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-whatsapp-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeMembers}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Warnings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalWarnings}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-emerald-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Agent Actions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.agentActions}</p>
              </div>
              <Zap className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-whatsapp-dark to-emerald-700 text-white p-4 flex items-center gap-3">
              <MessageSquare className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Guild Chat</h2>
                <p className="text-xs text-emerald-100">AI-powered group management</p>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 bg-whatsapp-bg dark:bg-gray-900 scroll-smooth">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-3 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`chat-bubble px-4 py-2 rounded-2xl shadow-md ${
                        message.type === 'user'
                          ? 'bg-whatsapp-light dark:bg-emerald-600 text-gray-900 dark:text-white'
                          : message.type === 'agent'
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-emerald-200 dark:border-gray-600'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-gray-900 dark:text-yellow-100 border border-yellow-300 dark:border-yellow-700'
                      }`}
                    >
                      <p className="font-semibold text-sm mb-1">{message.sender}</p>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a command for the Guild Agent..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-whatsapp-primary dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-whatsapp-primary to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Members List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <h3 className="font-bold">Group Members</h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                {members.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between mb-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                          {member.name}
                          {member.role === 'admin' && <Crown className="w-3 h-3 text-yellow-500" />}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {member.warnings > 0 ? `${member.warnings} warning${member.warnings > 1 ? 's' : ''}` : 'No warnings'}
                        </p>
                      </div>
                    </div>
                    {member.role !== 'admin' && (
                      <button
                        onClick={() => handleWarnMember(member.id)}
                        className="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Agent Activity Log */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-bold">Agent Activity</h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {agentActions.slice(0, 8).map((action) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="mb-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-purple-100 dark:border-gray-600"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {action.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {action.timestamp.toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-whatsapp-primary" />
            Guild Agent Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border border-green-100 dark:border-gray-600">
              <Shield className="w-8 h-8 text-whatsapp-primary mb-2" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Auto Moderation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Automatically detects and removes spam, inappropriate content, and suspicious links</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 border border-blue-100 dark:border-gray-600">
              <UserPlus className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Member Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Welcomes new members, tracks warnings, and manages permissions autonomously</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-100 dark:border-gray-600">
              <Activity className="w-8 h-8 text-purple-600 mb-2" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Smart Analytics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Provides insights on group activity, member engagement, and security alerts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
